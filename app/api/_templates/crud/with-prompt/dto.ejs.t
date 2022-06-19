---
to: src/api/<%=name%>/dto.js
---
<% 
  fields = fields.map(field=>[field.split(':')[0], field.split(':')[1]]) 
-%>
const toDTO = (<%= name %>) => {
  return {
    id: <%=name%>.id,
    <% for (let i=0;i<fields.length;i++) { -%>
    <%=fields[i][0]%>: <%=name%>.<%=fields[i][0]%>,
    <% } %>
  }
}

const toDatabase = (body) => {
  return {
    id: body.id,
    <% for (let i=0;i<fields.length;i++) { -%>
    <%=fields[i][0]%>: body.<%=fields[i][0]%>,
    <% } %>
  }
}

module.exports = { toDTO, toDatabase }
