---
to: src/api/<%=name%>/controller.js
---
<%
capitalizedName = h.inflection.capitalize(name)
pluralName = h.inflection.pluralize(name)
capitalizedPluralName = h.inflection.capitalize(h.inflection.pluralize(name))
fields = fields.map(field=>[field.split(':')[0], field.split(':')[1]]) 
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

const index = ({ query }, res, next) => {
  try {
    const result = await <%= capitalizedName %>.findAndCountAll({
      where: toWhere(query.filter, [<%- filtering.map(v=>`"${v}"`).join(", ") %>]),
      order: toOrder(query, [<%- ordering.map(v=>`"${v}"`).join(", ") %>]),
      ...toLimitAndOffset(query)
    })

    return success({
      total: result.count,
      limit: query.limit,
      page: query.page,
      data: result.rows.map((row) => toDTO(row))
    })
  } catch (error) {
    return next(error)
  }

const create = ({ body }, res, next) =>
  <%= capitalizedName %>.create(body)
    .then((<%= name %>) => {
      return { data: toDTO(<%= name %>) }
    })
    .then(success(res, 201))
    .catch(validationError(res))
    .catch(next)

const update = ({ body, params: { id } }, res, next) =>
  <%= capitalizedName %>.update(body, { where: { id: +id }, returning: true })
    .then(([_, [<%=name%>]]) => {
      return { data: toDTO(<%=name%>) }
    })
    .then(success(res))
    .catch(next)

const destroy = ({ params: { id } }, res, next) =>
  <%= capitalizedName %>.findByPk(id)
    .then(notFound(res))
    .then((<%= name %>) => (<%= name %> ? <%= name %>.destroy() : null))
    .then(success(res, 204))
    .catch(next)

module.exports = { index, create, update, destroy }
