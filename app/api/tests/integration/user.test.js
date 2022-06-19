const request = require('supertest')
const { createUser } = require('../utils/user')
const User = require('../../src/api/user/model')
const sequelize = require('../../src/services/sequelize')
const loadExpress = require('../../src/services/express')
const { generateToken } = require('../utils/auth')
const { clearDatabase } = require('../utils/database')

describe('user routes', () => {
  const userData = {
    name: 'test name',
    email: 'test@example.com',
    role: 'OWNER'
  }
  const app = loadExpress()
  let token

  beforeEach(async () => {
    await clearDatabase()
    const loggedInUser = {
      name: 'test name',
      email: 'owner@example.com',
      role: 'OWNER'
    }
    const ownerUser = await createUser(loggedInUser)
    token = await generateToken(ownerUser.get())
  })

  afterAll(() => {
    sequelize.close()
  })

  describe('get /users', () => {
    test('should return list of users', async () => {
      const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
      expect(res.body.data).not.toHaveProperty('password')
      expect(Array.isArray(res.body.data)).toBe(true)

      return true
    })
  })

  describe('post /users', () => {
    test('should return created user', async () => {
      const res = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send(userData)
        .expect(201)
      expect(res.body.data).toMatchObject({
        name: 'test name',
        email: 'test@example.com',
        image: null,
        createdAt: expect.anything(),
        updatedAt: expect.anything()
      })

      const createdUser = await User.findOne({
        where: { email: userData.email }
      })
      expect(createdUser.get()).toBeDefined()
      expect(createdUser.get()).toMatchObject({
        name: userData.name,
        email: userData.email,
        role: userData.role,
        image: null
      })
    })

    test('should return 400 if email is not unique', async () => {
      await createUser(userData)
      await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send(userData)
        .expect(400)
    })

    test('should return 400 if email is not email', async () => {
      await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...userData, email: 'banana' })
        .expect(400)
    })

    test('should return 400 if name is longer than 255', async () => {
      let testName = ''
      for (let i = 0; i < 256; i++) {
        testName += 'a'
      }
      await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...userData, name: testName })
        .expect(400)
    })

    test('should return 401 if did not put token', async () => {
      await request(app).post('/users').send(userData).expect(401)
    })
  })

  describe('put /users/:id', () => {
    test('should return updated user', async () => {
      const createdUser = await createUser(userData)

      const res = await request(app)
        .put(`/users/${createdUser.get().id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'updatedName' })
        .expect(200)

      expect(res.body.data).toMatchObject({
        name: 'updatedName'
      })

      const updatedUser = await User.findOne({
        where: { email: createdUser.email }
      })
      expect(updatedUser.get()).toBeDefined()
      expect(updatedUser.get()).toMatchObject({
        name: 'updatedName',
        email: createdUser.email,
        role: createdUser.role,
        image: null
      })
    })
  })

  describe('delete /users/:id', () => {
    test('should return status 204', async () => {
      const createdUser = await createUser(userData)

      await request(app)
        .delete(`/users/${createdUser.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      return true
    })
  })
})
