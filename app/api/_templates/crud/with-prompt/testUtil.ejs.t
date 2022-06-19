---
to: tests/utils/<%=name%>.js
---
<%
capitalizedName = h.inflection.capitalize(name)
pluralName = h.inflection.pluralize(name)
capitalizedPluralName = h.inflection.capitalize(h.inflection.pluralize(name))
-%>
const <%=capitalizedName%> = require('../../src/api/<%=name%>/model')

const create<%=capitalizedName%> = async (<%=name%>Data) => {
  const <%=name%> = await <%=capitalizedName%>.create(<%=name%>Data)
  return <%=name%>
}

module.exports = { create<%=capitalizedName%> }
