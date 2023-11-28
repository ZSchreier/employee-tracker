

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
  db.query(`SELECT * FROM department`, (err, results) => {
    if(err){
      console.log(err)
    }else {
      console.log(results)
      printTable(results)
    }
  })
}

/*
SELECT t.teacher_name, s.subject_name FROM teachers t
  LEFT JOIN subjects s ON s.teacher_id = t.id
*/

function getAllRoles() {
  db.query(`SELECT * FROM roles`, (err, results) => {
    if(err){
      console.log(err)
    }else {
      console.log(results)

      for(x=0; x < results.length; x++){
        db.query(`SELECT * FROM departments WHERE id=${x}`, (err, newResult) => {
          if(err){
            console.log(err)
          }
          results[x].department_id = newResult.name
        })
      }

      printTable(results)
    }
  })
}

function getAllEmployees() {
  db.query(`SELECT * FROM employees`, (err, results) => {
    if(err){
      console.log(err)
    }else {
      console.log(results)
      printTable(results)
    }
  })
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