---
to: src/api/<%=name%>/controller.js
---
<%
capitalizedName = h.inflection.capitalize(name)
pluralName = h.inflection.pluralize(name)
capitalizedPluralName = h.inflection.capitalize(h.inflection.pluralize(name))
fields = fields.map(field=>[field.split(':')[0], field.split(':')[1]]) 
relationships = relationships.map(r=>[r.split(':')[0], r.split(':')[1]]) 
-%>

const { notFound, validationError } = require('../../utils/httpResponse')
const { success } = require('../../utils/httpResponse')
const {
  toOrder,
  toWhere,
  toLimitAndOffset
} = require('../../utils/httpToSequelize')
const <%= capitalizedName %> = require('./model')
const { toDTO } = require('./dto')
<% for (let i=0; i<relationships.length; i++) { -%>
const <%= h.inflection.capitalize(relationships[i][1]) %> = require('../<%=relationships[i][1]%>/model')
<% } -%>

const index = async ({ query }, res, next) => {
  try {
    const result = await <%= capitalizedName %>.findAndCountAll({
      where: toWhere(query.filter, [<%- filtering.map(v=>`"${v}"`).join(", ") %>]),
      order: toOrder(query, [<%- ordering.map(v=>`"${v}"`).join(", ") %>]),
      ...toLimitAndOffset(query),
      include: [
        <% for (let i=0; i<relationships.length; i++) { -%>
        <%= h.inflection.capitalize(relationships[i][1]) %>
        <% } -%>
        ]
    })

    return success(res)({
      total: result.count,
      limit: query.limit,
      page: query.page,
      data: result.rows.map((row) => toDTO(row))
    })
  } catch (error) {
    return next(error)
  }
}

const create = ({ body }, res, next) =>
  <%= capitalizedName %>.create(body, {
      include: [
      <% for (let i=0; i<relationships.length; i++) { -%>
      <%= h.inflection.capitalize(relationships[i][1]) %>
      <% } -%>
      ]
    })
    .then((<%= name %>) => { return { data: toDTO(<%= name %>) } })
    .then(success(res, 201))
    .catch(validationError(res))
    .catch(next)

const update = ({ body, params: { id } }, res, next) =>
  <%= capitalizedName %>.update(body, { where: { id: +id }, returning: true })
    .then(() => <%= capitalizedName %>.findByPk(id, {
      include: [
      <% for (let i=0; i<relationships.length; i++) { -%>
      <%= h.inflection.capitalize(relationships[i][1]) %>
      <% } -%>
      ]
    }))
    .then((<%= name %>) => { return { data: toDTO(<%= name %>) } })
    .then(success(res))
    .catch(next)

const destroy = ({ params: { id } }, res, next) =>
  <%= capitalizedName %>.findByPk(id)
    .then(notFound(res))
    .then((<%= name %>) => (<%= name %> ? <%= name %>.destroy() : null))
    .then(success(res, 204))
    .catch(next)

module.exports = { index, create, update, destroy }
