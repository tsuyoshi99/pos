const request = require('supertest')
const sequelize = require('../../src/services/sequelize')
const loadExpress = require('../../src/services/express')
const { registerUser } = require('../utils/auth')
const { clearDatabase } = require('../utils/database')

describe('auth routes', () => {
  const userData = {
    email: 'test@example.com',
    password: '12345678'
  }

  const app = loadExpress()

  beforeEach(async () => {
    await clearDatabase()
  })

  afterAll(() => {
    sequelize.close()
  })

  describe('post /auth/login', () => {
    test('should return logged in user', async () => {
      await registerUser(userData)

      const res = await request(app)
        .post('/auth/login')
        .send(userData)
        .expect(200)

      expect(res.body.data).toBeDefined()
      expect(res.body.data).toMatchObject({
        email: userData.email
      })
    })

    test('should return status 400 if password length is less than 8', async () => {
      const data = { ...userData, password: '123' }

      await request(app).post('/auth/login').send(data).expect(400)
    })
  })

  describe('post /auth/register', () => {
    test('should return registered user', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send(userData)
        .expect(200)

      expect(res.body.data).toBeDefined()
      expect(res.body.data).toMatchObject({
        email: userData.email
      })
    })

    test('should return status 400 if password length is less than 8', async () => {
      const data = { ...userData, password: '123' }

      await request(app).post('/auth/register').send(data).expect(400)
    })
  })
})
