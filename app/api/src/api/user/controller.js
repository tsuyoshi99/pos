const { notFound, validationError } = require('../../utils/httpResponse')
const { success } = require('../../utils/httpResponse')
const {
  toOrder,
  toWhere,
  toLimitAndOffset
} = require('../../utils/httpToSequelize')
const { toDTO } = require('./dto')
const User = require('./model')

const index = ({ query }, res, next) =>
  User.findAndCountAll({
    where: toWhere(query.filter, ['id']),
    order: toOrder(query, ['name', 'email']),
    ...toLimitAndOffset(query)
  })
    .then((result) => ({
      total: result.count,
      limit: query.limit,
      page: query.page,
      data: result.rows.map((row) => toDTO(row))
    }))
    .then(success(res))
    .catch(next)

const create = ({ body }, res, next) =>
  User.create(body)
    .then((user) => {
      return { data: toDTO(user) }
    })
    .then(success(res, 201))
    .catch(validationError(res))
    .catch(next)

const update = ({ body, params: { id } }, res, next) =>
  User.update(body, { where: { id: +id }, returning: true })
    .then(([_, [user]]) => {
      return { data: toDTO(user) }
    })
    .then(success(res))
    .catch(next)

const destroy = ({ params: { id } }, res, next) =>
  User.findByPk(id)
    .then(notFound(res))
    .then((user) => (user ? user.destroy() : null))
    .then(success(res, 204))
    .catch(next)

module.exports = { index, create, update, destroy }
