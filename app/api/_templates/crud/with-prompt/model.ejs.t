---
to: src/api/<%=name%>/model.js
---
<%
capitalizedName = h.inflection.capitalize(name)
pluralName = h.inflection.pluralize(name)
capitalizedPluralName = h.inflection.capitalize(h.inflection.pluralize(name))
fields = fields.map(field=>[field.split(':')[0], field.split(':')[1]]) 
-%>
const { DataTypes } = require('sequelize')
const sequelize = require('../../services/sequelize')

const <%= capitalizedName %> = sequelize.define('<%= pluralName %>', {
  <% for (let i=0;i<fields.length;i++) { -%>
  <%= fields[i][0] %>: {
    type: DataTypes.<%= fields[i][1].toUpperCase() %>
  },
  <% } -%>
  },
)

<%= capitalizedName %>.associate = function (models) {
  // associations can be defined here
}

module.exports = <%= capitalizedName %>
