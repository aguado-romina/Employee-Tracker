let mysql = require("mysql");
let inquirer = require("inquirer");
let cTable = require("console.table");

let connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Romina14",
  database: "employee_trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  runEmployeeManagment();
});

function runEmployeeManagment() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "VIEW Departments",
        "VIEW Employees",
        "VIEW Roles",
        "ADD Departments",
        "ADD Employees",
        "ADD Roles",
        "UPDATE employee roles",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "VIEW Departments":
          //console.log(answer);
          viewDepartments();
          break;

        case "VIEW Employees":
          viewEmployees();
          break;

        case "VIEW Roles":
          viewRoles();
          break;

        case "ADD Departments":
          addDepartments();
          break;

        case "ADD Employees":
          addEmployees();
          break;

        case "ADD Roles":
          addRoles();
          break;

        case "UPDATE employee roles":
          updateEmployeeRoles();
          break;
      }
    });
}
function viewDepartments() {
  //let query = "SELECT * FROM department_info";
  let query = "SELECT department_name FROM department_info";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runEmployeeManagment();
  });
}
function viewEmployees() {
  let query =
    "SELECT employee_info.first_name, employee_info.last_name, employee_info.role_id, employee_info.managers_id, role_info.title, role_info.salary, role_info.department_id FROM employee_info INNER JOIN role_info ON employee_info.id = role_info.id";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runEmployeeManagment();
  });
}
function viewRoles() {
  let query = "SELECT title FROM role_info";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runEmployeeManagment();
  });
}
function addDepartments() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What Department would you like to add?",
      },
    ])
    .then(function (res) {
      let query = connection.query(
        "INSERT INTO department_info SET ? ",
        {
          department_name: res.name,
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          runEmployeeManagment();
        }
      );
    });
}
