
const {getAllDepartments, getAllEmployees, getAllRoles, addDepartment, addEmployee, addRole, updateEmployee} = require('./functions')

const inquirer = require('inquirer');
const mysql = require('mysql2');
const { printTable } = require('console-table-printer')

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'something',
    database: 'employee_db'
  }
);

 async function main() {
  await inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'choice',
      choices: [
        {name: 'View All Departments', value: 1},
        {name: 'View All Roles', value: 2},
        {name: 'View All Employees', value: 3},
        {name: 'Add a Department', value: 4},
        {name: 'Add a Role', value: 5},
        {name: 'Add an Employee', value: 6},
        {name: 'Update an Employee', value: 7}
      ]
    }
  ]).then(response => {
    if(response.choice === 1){
      getAllDepartments()
      main()
    }
    if(response.choice === 2){
      getAllRoles()
      // main()
    }
    if(response.choice === 3){
      getAllEmployees()
      // main()
    }
    if(response.choice === 4){
      addDepartment()
      // main()
    }
    if(response.choice === 5){
      addRole()
      // main()
    }
    if(response.choice === 6){
      addEmployee()
      // main()
    }
    if(response.choice === 7){
      updateEmployee()
      // main()
    }
  }).catch(error => {
    console.log(error)
  })
}

main();

module.exports = main;