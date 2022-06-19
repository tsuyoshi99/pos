---
to: src/api/<%=name%>/index.js
---
<%
capitalizedName = h.inflection.capitalize(name)
pluralName = h.inflection.pluralize(name)
capitalizedPluralName = h.inflection.capitalize(h.inflection.pluralize(name))
fields = fields.map(field=>[field.split(':')[0], field.split(':')[1]]) 
-%>
const { celebrate, Joi, Segments } = require('celebrate')
const { Router } = require('express')
const { create, index, update, destroy } = require('./controller')

const router = new Router()

/**
 * @api {get} /<%=pluralName%>?limit=1 Retrieve <%=pluralName%>
 * @apiName Retrieve<%=capitalizedPluralName%>
 * @apiGroup <%=capitalizedName%>
 * @apiPermission <%= role %>
<% for (let i=0;i<fields.length;i++) { -%>
 * @apiBody {<%= h.inflection.capitalize(fields[i][1]) %>} [<%= fields[i][0] %>] <%=capitalizedName%>'s <%= fields[i][0] %>.
<% } -%>
 * @apiUse listParams
 * @apiSuccess {Object[]} <%=pluralName%> List of <%=pluralName%>.
 * @apiError {Object} 400 Some parameters or body may contain invalid values.
 * @apiError 401 user access only.
 */
router.get(
  '/',
  celebrate(
    {
      [Segments.QUERY]: Joi.object({
        filter: Joi.string(),
        order: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()

      }),
      [Segments.BODY]: {
        <% for (let i=0;i<fields.length;i++) { -%>
          <%=fields[i][0]%>: Joi.<%=fields[i][1]%>(),
        <% } -%>
      }
    },
    { abortEarly: false }
  ),
  index
)

/**
 * @api {post} /<%=pluralName%> Create <%=name%>
 * @apiName Create<%=capitalizedName%>
 * @apiGroup <%=capitalizedName%>
 * @apiPermission <%= role %>
<% for (let i=0;i<fields.length;i++) { -%>
 * @apiBody {<%= h.inflection.capitalize(fields[i][1]) %>} [<%= fields[i][0] %>] <%=capitalizedName%>'s <%= fields[i][0] %>.
<% } -%>
 * @apiSuccess (Sucess 201) {Object} <%=name%> <%=capitalizedName%>'s data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      <% for (let i=0;i<fields.length;i++) { -%>
        <%=fields[i][0]%>: Joi.<%=fields[i][1]%>(),
      <% } -%>
    }
  }),
  create
)

/**
 * @api {put} /<%=pluralName%>/1 Update <%=name%>
 * @apiName Update<%=capitalizedName%>
 * @apiGroup <%=capitalizedName%>
 * @apiPermission <%= role %>
<% for (let i=0;i<fields.length;i++) { -%>
 * @apiBody {<%= h.inflection.capitalize(fields[i][1]) %>} [<%= fields[i][0] %>] <%=capitalizedName%>'s <%= fields[i][0] %>.
<% } -%>
 * @apiSuccess {Object} <%=name%> <%=capitalizedName%>'s data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 <%=capitalizedName%> not found.
 */
router.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required()
    }),
    [Segments.BODY]: {
      <% for (let i=0;i<fields.length;i++) { -%>
        <%=fields[i][0]%>: Joi.<%=fields[i][1]%>(),
      <% } -%>
    }
  }),
  update
)

/**
 * @api {delete} /<%=pluralName%>/1 Delete <%=name%>
 * @apiName Delete<%=capitalizedName%>
 * @apiGroup <%=capitalizedName%>
 * @apiPermission <%= role %>
<% for (let i=0;i<fields.length;i++) { -%>
 * @apiBody {<%= h.inflection.capitalize(fields[i][1]) %>} [<%= fields[i][0] %>] <%=capitalizedName%>'s <%= fields[i][0] %>.
<% } -%>
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 <%=capitalizedName%> not found.
 */
router.delete('/:id', destroy)

module.exports = router
