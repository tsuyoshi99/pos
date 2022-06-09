module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'What is your module name ?'
  },
  {
    type: 'list',
    name: 'fields',
    message: 'What are the fields ? Example: "name:string, age:number"'
  },
  {
    type: 'list',
    name: 'filtering',
    message: 'Fields that allow filtering. Example: "name, age"'
  },
  {
    type: 'list',
    name: 'ordering',
    message: 'Fields that allow ordering. Example: "name, age"'
  },
  {
    type: 'confirm',
    name: 'admin',
    message: 'Admin Only ?'
  }
]
