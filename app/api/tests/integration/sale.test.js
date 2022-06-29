const request = require('supertest')
const { createUser } = require('../utils/user')
const { createSale } = require('../utils/sale')
const Sale = require('../../src/api/sale/model')
const sequelize = require('../../src/services/sequelize')
const loadExpress = require('../../src/services/express')
const { generateToken } = require('../utils/auth')
const { clearDatabase } = require('../utils/database')

describe('sale routes', () => {
  const saleData = {}
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

  describe('get /sales', () => {
    test('should return list of sales', async () => {
      const res = await request(app)
        .get('/sales')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
      expect(Array.isArray(res.body.data)).toBe(true)

      return true
    })
  })

  describe('post /sales', () => {
    test('should return created sale', async () => {
      const res = await request(app)
        .post('/sales')
        .set('Authorization', `Bearer ${token}`)
        .send(saleData)
        .expect(201)
      expect(res.body.data).toMatchObject({})

      const createdSale = await Sale.findOne({
        where: { id: res.body.data.id }
      })
      expect(createdSale.get()).toBeDefined()
      expect(createdSale.get()).toMatchObject({ userId: expect.anything() })
    })

    test('should return 401 if did not put token', async () => {
      await request(app).post('/sales').send(saleData).expect(401)
    })
  })

  describe('delete /sales/:id', () => {
    test('should return status 204', async () => {
      const createdSale = await createSale(saleData)

      await request(app)
        .delete(`/sales/${createdSale.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      return true
    })
  })
})
