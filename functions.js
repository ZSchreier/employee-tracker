

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

function getAllDepartments() {
  console.log('get all departments')
}

function getAllRoles() {
  console.log('get all roles')
}

function getAllEmployees() {
  console.log('get all employees')
}

function addDepartment() {
  console.log('add department')
}

function addRole() {
  console.log('add role')
}

function addEmployee() {
  console.log('add employee')
}

function updateEmployee() {
  console.log('update employee')
}

module.exports = {
  getAllDepartments,
  getAllEmployees,
  getAllRoles,
  addDepartment,
  addEmployee,
  addRole,
  updateEmployee
}