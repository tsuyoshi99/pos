---
to: tests/integration/<%=name%>.test.js
---
<%
capitalizedName = h.inflection.capitalize(name)
pluralName = h.inflection.pluralize(name)
capitalizedPluralName = h.inflection.capitalize(h.inflection.pluralize(name))
fields = fields.map(field=>[field.split(':')[0], field.split(':')[1]]) 
-%>
const request = require('supertest')
const { createUser } = require('../utils/user')
const { create<%=capitalizedName%> } = require('../utils/<%=name%>')
const <%= capitalizedName %> = require('../../src/api/<%= name %>/model')
const sequelize = require('../../src/services/sequelize')
const loadExpress = require('../../src/services/express')
const { generateToken } = require('../utils/auth')
const { clearDatabase } = require('../utils/database')

describe('<%= name %> routes', () => {
  const <%= name %>Data = {
    <% for (let i=0;i<fields.length;i++) { -%>
        <%=fields[i][0]%>: '',
    <% } -%>
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

  describe('get /<%= pluralName %>', () => {
    test('should return list of <%= pluralName %>', async () => {
      const res = await request(app)
        .get('/<%= pluralName %>')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
      expect(Array.isArray(res.body.data)).toBe(true)

      return true
    })
  })

  describe('post /<%= pluralName %>', () => {
    test('should return created <%= name%>', async () => {
      const res = await request(app)
        .post('/<%= pluralName %>')
        .set('Authorization', `Bearer ${token}`)
        .send(<%= name %>Data)
        .expect(201)
      expect(res.body.data).toMatchObject({
        <% for (let i=0;i<fields.length;i++) { -%>
            <%=fields[i][0]%>: '',
        <% } -%>
      })

      const created<%= capitalizedName %> = await <%= capitalizedName %>.findOne({
        where: { id: res.body.data.id }
      })
      expect(created<%= capitalizedName %>.get()).toBeDefined()
      expect(created<%= capitalizedName %>.get()).toMatchObject({
        <% for (let i=0;i<fields.length;i++) { -%>
            <%=fields[i][0]%>: '',
        <% } -%>
      })
    })

    test('should return 401 if did not put token', async () => {
      await request(app).post('/<%= pluralName %>').send(<%= name %>Data).expect(401)
    })
  })

  describe('put /<%= pluralName %>/:id', () => {
    test('should return updated <%= name %>', async () => {
      const created<%=capitalizedName%> = await create<%=capitalizedName%>(<%=name%>Data)

      const res = await request(app)
        .put(`/<%= pluralName %>/${created<%=capitalizedName%>.get().id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ 
            // update sth here 
        })
        .expect(200)

      expect(res.body.data).toMatchObject({
        // confirm if the data is updated here
      })

      const updated<%=capitalizedName%> = await <%=capitalizedName%>.findOne({
        where: { id: created<%=capitalizedName%>.id }
      })
      expect(updated<%=capitalizedName%>.get()).toBeDefined()
      expect(updated<%=capitalizedName%>.get()).toMatchObject({
        // confirm if it actually updated in the database here
        <% for (let i=0;i<fields.length;i++) { -%>
            <%=fields[i][0]%>: '',
        <% } -%>
      })
    })
  })

  describe('delete /<%= pluralName %>/:id', () => {
    test('should return status 204', async () => {
      const created<%=capitalizedName%> = await create<%=capitalizedName%>(<%=name%>Data)

      await request(app)
        .delete(`/<%= pluralName %>/${created<%=capitalizedName%>.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      return true
    })
  })
})
