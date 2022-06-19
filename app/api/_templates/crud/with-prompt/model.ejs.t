---
to: src/api/<%=name%>/model.js
---
<%
capitalizedName = h.inflection.capitalize(name)
pluralName = h.inflection.pluralize(name)
capitalizedPluralName = h.inflection.capitalize(h.inflection.pluralize(name))
fields = fields.map(field=>[field.split(':')[0], field.split(':')[1]]) 
relationships = relationships.map(r=>[r.split(':')[0], r.split(':')[1]]) 
-%>
const { DataTypes } = require('sequelize')
const sequelize = require('../../services/sequelize')
<% for (let i=0; i<relationships.length; i++) { -%>
  const <%= h.inflection.capitalize(relationships[i][1]) %> = require('../<%= relationships[i][1] %>/model')
<% } -%>

const <%= capitalizedName %> = sequelize.define('<%= pluralName %>', {
  <% for (let i=0;i<fields.length;i++) { -%>
  <%= fields[i][0] %>: {
    type: DataTypes.<%= fields[i][1].toUpperCase() %>
  },
  <% } -%>
  },
)


<% for (let i=0; i<relationships.length; i++) { -%>
  <% if (relationships[i][0] === "hasone") { -%>
    <%= capitalizedName %>.hasOne(<%= h.inflection.capitalize(relationships[i][1]) %>)
    <%= h.inflection.capitalize(relationships[i][1]) %>.belongsTo(<%= capitalizedName %>)
  <% } else if (relationships[i][0] === "hasmany") { -%>  
    <%= capitalizedName %>.hasMany(<%= h.inflection.capitalize(relationships[i][1]) %>)
    <%= h.inflection.capitalize(relationships[i][1]) %>.belongsTo(<%= capitalizedName %>)
  <% } else if (relationships[i][0] === "manytomany") { -%>  
    <%= capitalizedName %>.belongsToMany(<%= h.inflection.capitalize(relationships[i][1]) %> , { through: '<%= pluralName %><%=h.inflection.pluralize(h.inflection.capitalize(relationships[i][1]))%>' })
    <%= h.inflection.capitalize(relationships[i][1]) %>.belongsToMany(<%= capitalizedName %>, { through: '<%= pluralName %><%=h.inflection.pluralize(h.inflection.capitalize(relationships[i][1]))%>' })
  <% } -%>
<% } -%>


module.exports = <%= capitalizedName %>
