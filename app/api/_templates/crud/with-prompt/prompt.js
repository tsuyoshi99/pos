module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'What is your module name ?'
  },
  {
    type: 'list',
    name: 'fields',
    message: 'What are the fields ? Example: "name:string, description:string"'
  },
  {
    type: 'list',
    name: 'filtering',
    message: 'Fields that allow filtering. Example: "name, description"'
  },
  {
    type: 'list',
    name: 'ordering',
    message: 'Fields that allow ordering. Example: "name, description"'
  },
  {
    type: 'list',
    name: 'role',
    message: 'Required Role ?. Example: admin, user'
  },
  {
    type: 'list',
    name: 'relationships',
    message: 'In any relationship? Example: hasmany:product, manytomany:order'
  }
]
