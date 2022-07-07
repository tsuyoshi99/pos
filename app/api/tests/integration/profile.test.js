const request = require('supertest')
const { createUser } = require('../utils/user')
const sequelize = require('../../src/services/sequelize')
const loadExpress = require('../../src/services/express')
const { generateToken } = require('../utils/auth')
const { clearDatabase } = require('../utils/database')
const User = require('../../src/api/user/model')

describe('profile routes', () => {
  let loggedInUser
  const app = loadExpress()
  let token

  beforeEach(async () => {
    await clearDatabase()
    const loggedInUserData = {
      name: 'test name',
      email: 'owner@example.com',
      role: 'OWNER'
    }
    loggedInUser = await createUser(loggedInUserData)
    token = await generateToken(loggedInUser.get())
  })

  afterAll(() => {
    sequelize.close()
  })

  describe('get /profile', () => {
    test('should return list of profiles', async () => {
      const res = await request(app)
        .get('/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
      expect(res.body.data).toBeDefined()
      expect(res.body.data.name).toBe('test name')

      return true
    })
  })

  describe('put /profile', () => {
    test('should return updated profile', async () => {
      const res = await request(app)
        .put(`/profile`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'hello'
        })
        .expect(200)

      expect(res.body.data).toBeDefined()
      expect(res.body.data).toMatchObject({
        name: 'hello'
      })

      const updatedProfile = await User.findOne({
        where: { id: loggedInUser.id }
      })
      expect(updatedProfile.get()).toBeDefined()
      expect(updatedProfile.get()).toMatchObject({
        name: 'hello'
      })
    })
  })
})
