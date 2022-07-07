const request = require('supertest')
const { createUser } = require('../utils/user')
const { createProfile } = require('../utils/profile')
const Profile = require('../../src/api/profile/model')
const sequelize = require('../../src/services/sequelize')
const loadExpress = require('../../src/services/express')
const { generateToken } = require('../utils/auth')
const { clearDatabase } = require('../utils/database')

describe('profile routes', () => {
  const profileData = {
            name: '',
      }
  const app = loadExpress()
  let token

  beforeEach(async () => {
    await clearDatabase()
    const loggedInUserData = {
      name: 'test name',
      email: 'owner@example.com',
      role: 'OWNER'
    }
    const loggedInUser = await createUser(loggedInUserData)
    token = await generateToken(loggedInUser.get())
  })

  afterAll(() => {
    sequelize.close()
  })

  describe('get /profiles', () => {
    test('should return list of profiles', async () => {
      const res = await request(app)
        .get('/profiles')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
      expect(Array.isArray(res.body.data)).toBe(true)

      return true
    })
  })

  describe('post /profiles', () => {
    test('should return created profile', async () => {
      const res = await request(app)
        .post('/profiles')
        .set('Authorization', `Bearer ${token}`)
        .send(profileData)
        .expect(201)
      expect(res.body.data).toMatchObject({
                    name: '',
              })

      const createdProfile = await Profile.findOne({
        where: { id: res.body.data.id }
      })
      expect(createdProfile.get()).toBeDefined()
      expect(createdProfile.get()).toMatchObject({
                    name: '',
              })
    })

    test('should return 401 if did not put token', async () => {
      await request(app).post('/profiles').send(profileData).expect(401)
    })
  })

  describe('put /profiles/:id', () => {
    test('should return updated profile', async () => {
      const createdProfile = await createProfile(profileData)

      const res = await request(app)
        .put(`/profiles/${createdProfile.get().id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ 
            // update sth here 
        })
        .expect(200)

      expect(res.body.data).toMatchObject({
        // confirm if the data is updated here
      })

      const updatedProfile = await Profile.findOne({
        where: { id: createdProfile.id }
      })
      expect(updatedProfile.get()).toBeDefined()
      expect(updatedProfile.get()).toMatchObject({
        // confirm if it actually updated in the database here
                    name: '',
              })
    })
  })

  describe('delete /profiles/:id', () => {
    test('should return status 204', async () => {
      const createdProfile = await createProfile(profileData)

      await request(app)
        .delete(`/profiles/${createdProfile.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      return true
    })
  })
})
