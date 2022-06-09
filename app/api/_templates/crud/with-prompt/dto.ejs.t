---
to: src/api/<%=name%>/dto.js
---
<% 
  fields = fields.map(field=>[field.split(':')[0], field.split(':')[1]]) 
-%>
const toDTO = (<%= name %>) => {
  return {
    <% for (let i=0;i<fields.length;i++) { -%>
    <%=fields[i][0]%>: <%=name%>.<%=fields[i][0]%>,
    <% } %>
  }
}

module.exports = { toDTO }
