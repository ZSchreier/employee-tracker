

const inquirer = require('inquirer');
const mysql = require('mysql2');
const {printTable} = require('console-table-printer')


const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'something',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

