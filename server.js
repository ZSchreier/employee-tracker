
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

function start() {
  inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'main-menu-choice',
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
    if(response === 1){
      getAllDepartments()
      start()
    }
    if(response === 2){
      getAllRoles()
      start()
    }
    if(response === 3){
      getAllEmployees()
      start()
    }
    if(response === 4){
      addDepartment()
      start()
    }
    if(response === 5){
      addRole()
      start()
    }
    if(response === 6){
      addEmployee()
      start()
    }
    if(response === 7){
      updateEmployee()
      start()
    }
  })
}