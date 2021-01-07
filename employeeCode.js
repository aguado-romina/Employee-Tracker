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
  let query =
    "SELECT employee_info.first_name, employee_info.last_name, department_info.department_name AS Department FROM employee_info JOIN role_id ON employee_info.role_id = role_info.id JOIN department_info ON role_info.department_id = department_info.id ORDER BY employee_info.id;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runEmployeeManagment();
  });
}
function viewEmployees() {
  let query =
    "SELECT employee_info.first_name, employee_info.last_name, role_info.title, role_info.salary, department_info.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee_info INNER JOIN role on role_info.id = employee_info.role_id INNER JOIN department_info on department_info.id = role_info.department_id left join employee e on employee_info.manager_id = e.id;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runEmployeeManagment();
  });
}
function viewRoles() {
  let query =
    "SELECT employee_info.first_name, employee_info.last_name, role_info.title AS Title FROM employee_info JOIN role_info ON employee_info.role_id = role_info.id;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runEmployeeManagment();
  });
}
