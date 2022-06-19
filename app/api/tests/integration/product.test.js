const request = require('supertest')
const { createUser } = require('../utils/user')
const { createProduct } = require('../utils/product')
const Product = require('../../src/api/product/model')
const sequelize = require('../../src/services/sequelize')
const loadExpress = require('../../src/services/express')
const { generateToken } = require('../utils/auth')
const { clearDatabase } = require('../utils/database')

describe('product routes', () => {
  const productData = {
    name: 'test'
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
      expect(res.body.data).toMatchObject({
        name: 'test'
      })

      const createdProduct = await Product.findOne({
        where: { id: res.body.data.id }
      })
      expect(createdProduct.get()).toBeDefined()
      expect(createdProduct.get()).toMatchObject({
        name: 'test'
      })
    })

    test('should return 401 if did not put token', async () => {
      await request(app).post('/products').send(productData).expect(401)
    })
  })

  describe('put /products/:id', () => {
    test('should return updated user', async () => {
      const createdProduct = await createProduct(productData)

      const res = await request(app)
        .put(`/products/${createdProduct.get().id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'test2'
        })
        .expect(200)

      expect(res.body.data).toMatchObject({
        name: 'test2'
      })

      const updatedProduct = await Product.findOne({
        where: { id: createdProduct.id }
      })
      expect(updatedProduct.get()).toBeDefined()
      expect(updatedProduct.get()).toMatchObject({
        // confirm if it actually updated in the database here
        name: 'test2'
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
