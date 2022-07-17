const request = require('supertest')
const { createUser } = require('../utils/user')
const { createProduct } = require('../utils/product')
const { Product, Inventory } = require('../../src/api/product/model')
const sequelize = require('../../src/services/sequelize')
const loadExpress = require('../../src/services/express')
const { generateToken } = require('../utils/auth')
const { clearDatabase } = require('../utils/database')

describe('product routes', () => {
  const productData = {
    name: 'test123 prasdfoduct',
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
    inventory: [
      {
        quantity: 1000
      },
      {
        quantity: 500
      },
      {
        quantity: 5
      }
    ]
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

  describe('get /products', () => {
    test('should return list of products', async () => {
      const res = await request(app)
        .get('/products')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
      expect(Array.isArray(res.body.data)).toBe(true)

      return true
    })
  })

  describe('post /products', () => {
    test('should return created product', async () => {
      const res = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send(productData)
        .expect(201)
      expect(res.body.data).toBeDefined()
      expect(res.body.data).toMatchObject({
        name: 'test123 prasdfoduct',
        description: null,
        price: null,
        quantity: 132005,
        inventory: [
          {
            name: 'box',
            coefficient: 1,
            price: 10,
            quantity: 1100
          },
          {
            name: 'tablet',
            coefficient: 5,
            price: 10,
            quantity: 0
          },
          {
            name: 'pill',
            coefficient: 24,
            price: 10,
            quantity: 5
          }
        ]
      })

      const createdProduct = await Product.findOne({
        where: { id: res.body.data.id },
        include: Inventory
      })

      expect(createdProduct.get()).toBeDefined()
      expect(createdProduct.get()).toMatchObject({
        inventory: { quantity: '132005.00' }
      })
    })

    test('should return 401 if did not put token', async () => {
      await request(app).post('/products').send(productData).expect(401)
    })
  })

  describe('put /products/:id', () => {
    test('should return updated user', async () => {
      const createdProduct = await createProduct(productData)
      const updateProductData = {
        name: 'test123',
        inventory: [
          {
            quantity: 100
          },
          {
            quantity: 0
          },
          {
            quantity: 100
          }
        ]
      }

      const updatedProductData = {
        name: 'test123',
        quantity: 12100,
        inventory: [
          {
            name: 'box',
            coefficient: 1,
            price: 10,
            quantity: 100
          },
          {
            name: 'tablet',
            coefficient: 5,
            price: 10,
            quantity: 4
          },
          {
            name: 'pill',
            coefficient: 24,
            price: 10,
            quantity: 4
          }
        ]
      }

      const res = await request(app)
        .put(`/products/${createdProduct.get().id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updateProductData)
        .expect(200)

      expect(res.body.data).toMatchObject(updatedProductData)

      const updatedProduct = await Product.findOne({
        where: { id: createdProduct.id },
        include: Inventory
      })
      expect(updatedProduct.get()).toBeDefined()
      expect(updatedProduct.get()).toMatchObject({
        name: updatedProductData.name,
        inventory: { quantity: '12100.00' }
      })
    })
  })

  describe('delete /products/:id', () => {
    test('should return status 204', async () => {
      const createdProduct = await createProduct(productData)

      await request(app)
        .delete(`/products/${createdProduct.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      return true
    })
  })
})
