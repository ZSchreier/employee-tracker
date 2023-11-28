

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

const departmentQ = [
  {
    name: "d_name",
    type: 'input',
    message: "What is the name of the Department?"
  }
]

function getAllDepartments() {
  db.query(`SELECT * FROM department`, (err, results) => {
    if(err){
      console.log(err)
    }else {
      console.log(results)
      console.table(results)
      // printTable(results)
    }
  })
}

/*
SELECT t.teacher_name, s.subject_name FROM teachers t
  LEFT JOIN subjects s ON s.teacher_id = t.id
*/

function getAllRoles() {
  db.query('SELECT roles.id, roles.title, roles.salary, department.name AS department_name FROM department INNER JOIN roles ON department.id=roles.department_id', (err, results) => {
    if(err){
      console.log(err)
    }else {
      console.log(results)
      printTable(results)
    }
  })
}

function getAllEmployees() {

  const input = 
`
SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department_name, r.salary, IFNULL(CONCAT(m.first_name, ' ', m.last_name), 'none') AS manager
FROM employees e
    INNER JOIN roles r ON e.role_id = r.id
    INNER JOIN department d ON r.department_id  = d.id
    LEFT JOIN employees m ON m.id = e.manager_id
ORDER BY e.id`

  db.query(input, (err, results) => {
    if(err){
      console.log(err)
    }else {
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