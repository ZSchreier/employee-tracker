

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
  
}

function getAllRoles() {

}

function getAllEmployees() {

}

function addDepartment() {

}

function addRole() {

}

function addEmployee() {

}

function updateEmployee() {

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