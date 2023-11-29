
// require statements
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

// main menu function that controls what happens
async function main() {
  await inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'choice',
      choices: [
        { name: 'View All Departments', value: 1 },
        { name: 'View All Roles', value: 2 },
        { name: 'View All Employees', value: 3 },
        { name: 'Add a Department', value: 4 },
        { name: 'Add a Role', value: 5 },
        { name: 'Add an Employee', value: 6 },
        { name: 'Update an Employee', value: 7 }
      ]
    }
  ]).then(response => {
    if (response.choice === 1) {
      getAllDepartments()
      
    }
    if (response.choice === 2) {
      getAllRoles()
      
    }
    if (response.choice === 3) {
      getAllEmployees()
      
    }
    if (response.choice === 4) {
      addDepartment()
      
    }
    if (response.choice === 5) {
      addRole()
      
    }
    if (response.choice === 6) {
      addEmployee()
      
    }
    if (response.choice === 7) {
      updateEmployee()
      
    }
  }).catch(error => {
    console.log(error)
  })
}

// global variable for manager selection (initialized based on seed)
const managerList = [
  {name: "None", value: null},
  {name: "John Doe", value: 1},
  {name: "Mike Chan", value: 2},
  {name: "Ashley Rodriquez", value: 3},
  {name: "Kevin Tupik", value: 4},
  {name: "Kunal Singh", value: 5},
  {name: "Malia Brown", value: 6},
  {name: "Sarah Lourd", value: 7},
  {name: "Tom Allen", value: 8}
]

// global variable for employee selection (initialized based on seed)
const employeeList = [
  {name: "John Doe", value: 1},
  {name: "Mike Chan", value: 2},
  {name: "Ashley Rodriquez", value: 3},
  {name: "Kevin Tupik", value: 4},
  {name: "Kunal Singh", value: 5},
  {name: "Malia Brown", value: 6},
  {name: "Sarah Lourd", value: 7},
  {name: "Tom Allen", value: 8}
]

// global variable for role selection (initialized based on seed)
const roleList = [
  {name: "Sales Lead", value: 1},
  {name: "Salesperson", value: 2},
  {name: "Lead Engineer", value: 3},
  {name: "Software Engineer", value: 4},
  {name: "Account Manager", value: 5},
  {name: "Accountant", value: 6},
  {name: "Legal Team Lead", value: 7},
  {name: "Lawyer", value: 8}
]

// global variable for department selection (initialized based on seed)
const departmentList = [
  {name: "Sales", value: 1},
  {name: "Engineering", value: 2},
  {name: "Finance", value: 3},
  {name: "Legal", value: 4}
]

// questions for creating department
const departmentQ = [
  {
    name: "d_name",
    type: 'input',
    message: "What is the name of the new department?"
  }
]

// questions for creating role
const rolesQ = [
  {
    name: "title",
    type: 'input',
    message: "What is the name of the new role?"
  },
  {
    name: 'salary',
    type: "number",
    message: "What is the salary for the position?"
  },
  {
    name: 'name',
    type: 'list',
    message: "Which department will this role belong to?",
    choices: departmentList
  }
]

// questions for creating employee
const employeeQ = [
  {
    name: "first_name",
    type: 'input',
    message: "What is the first name of the new employee?"
  },
  {
    name: 'last_name',
    type: "input",
    message: "What is the last name of the new employee?"
  },
  {
    name: 'role_id',
    type: 'list',
    message: "What is the new employee's role?",
    choices: roleList
  },
  {
    name: 'manager_id',
    type: 'list',
    message: "Who is the new employee's manager?",
    choices: managerList
  }
]

// questions for updating an employee
const updateQ = [
  {
    name: 'id',
    type: 'list',
    message: "Which employee's role is changing?",
    choices: employeeList
  },
  {
    name: 'role_id',
    type: 'list',
    message: "What is the new employee's role?",
    choices: roleList
  }
]

// function for displaying all departments
function getAllDepartments() {
  db.query(`SELECT * FROM department`, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`

      `)
      printTable(results)
      main()
    }
  })
}

// function for displaying all roles
function getAllRoles() {
  db.query('SELECT roles.id, roles.title, roles.salary, department.name AS department_name FROM department INNER JOIN roles ON department.id=roles.department_id', (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`
      
      `)
      printTable(results)
      main()
    }
  })
}

// function for displaying all employees
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
    if (err) {
      console.log(err)
    } else {
      console.log(`
      
      `)
      printTable(results)
      main()
    }
  })
}

// function for adding a department
function addDepartment() {
  inquirer.prompt(departmentQ).then((response) => {
    db.query(`INSERT INTO department (name) VALUES ("${response.d_name}")`)
    departmentList.push({ name: response.d_name, value: departmentList.length + 1 })
    console.log('Department added successfully')
    main()
  })

}

// function for adding a role
function addRole() {
  inquirer.prompt(rolesQ).then((response) => {

    db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${response.title}", ${response.salary}, ${response.name})`)
    roleList.push({ name: response.title, value: roleList.length + 1 })
    console.log('Role added successfully')
    main()
  })

}

// function for adding an employee
function addEmployee() {
  inquirer.prompt(employeeQ).then((response) => {
    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${response.first_name}", "${response.last_name}", ${response.role_id}, ${response.manager_id})`)
    employeeList.push({ name: `${response.first_name} ${response.last_name}`, value: employeeList.length+1 })
    managerList.push({ name: `${response.first_name} ${response.last_name}`, value: managerList.length })
    console.log('Employee added successfully')
    main()
  })

}

// function for updating an employee's role
function updateEmployee() {
  inquirer.prompt(updateQ).then((response) => {
    db.query(`UPDATE employees SET role_id = ${response.role_id} WHERE id = ${response.id}`)
    console.log('Employee updated successfully')
    main()
  })

}

// initial call statement for the main menu
main();