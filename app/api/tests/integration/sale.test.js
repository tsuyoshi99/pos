const request = require('supertest')
const { createUser } = require('../utils/user')
const { createSale } = require('../utils/sale')
const Sale = require('../../src/api/sale/model')
const sequelize = require('../../src/services/sequelize')
const loadExpress = require('../../src/services/express')
const { generateToken } = require('../utils/auth')
const { clearDatabase } = require('../utils/database')
const { createProduct } = require('../utils/product')

describe('sale routes', () => {
  const saleData = {
    items: []
  }
  const app = loadExpress()
  let token

  beforeEach(async () => {
    await clearDatabase()

    const productData = {
      name: 'test123',
      price: 10,
      forms: [
        {
          name: 'box',
          price: 10,
          coefficient: 1
        },
        {
          name: 'tablet',
          price: 10,
          coefficient: 5
        },
        {
          name: 'pill',
          price: 10,
          coefficient: 24
        }
      ],
      inventory: {
        quantity: 20000
      }
    }

    const product1 = await createProduct(productData)
    const product2 = await createProduct(productData)

    saleData.items = [
      {
        productId: product1.id,
        price: parseFloat(product1.price),
        quantity: [
          {
            quantity: 10
          },
          {
            quantity: 5
          },
          {
            quantity: 0
          }
        ]
      },
      {
        productId: product2.id,
        price: parseFloat(product2.price),
        quantity: [
          {
            quantity: 10
          },
          {
            quantity: 0
          },
          {
            quantity: 5
          }
        ]
      }
    ]

    const loggedInUserData = {
      name: 'test name',
      email: 'owner@example.com',
      role: 'OWNER'
    }
    const loggedInUser = await createUser(loggedInUserData)
    token = await generateToken(loggedInUser.get())
  })

  afterAll(async () => {
    await sequelize.close()
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

      expect(res.body.data).toBeDefined()
      expect(res.body.data).toMatchObject({
        items: [
          {
            id: 1,
            name: 'test123',
            description: null,
            quantity: [
              {
                quantity: 10
              },
              {
                quantity: 5
              },
              {
                quantity: 0
              }
            ]
          },
          {
            id: 2,
            name: 'test123',
            description: null,
            quantity: [
              {
                quantity: 10
              },
              {
                quantity: 0
              },
              {
                quantity: 5
              }
            ]
          }
        ],
        total: 300,
        userId: 1
      })

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
