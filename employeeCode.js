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
function addRoles() {
  connection.query(
    "SELECT role_info.title AS Title, role_info.salary AS Salary FROM role_info",
    function (err, res) {
      inquirer
        .prompt([
          {
            name: "Title",
            type: "input",
            message: "What is the roles Title?",
          },
          {
            name: "Salary",
            type: "input",
            message: "What is the Salary?",
          },
        ])
        .then(function (res) {
          connection.query(
            "INSERT INTO role_info SET ? ",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function (err) {
              if (err) throw err;
              console.table(res);
              runEmployeeManagment();
            }
          );
        });
    }
  );
}
function addEmployees() {
  connection.query(
    "SELECT employee_info.first_name AS FirstName, employee_info.last_name AS LastName, employee_info.role_id AS Role, employee_info.managers_id AS ManagerID, role_info.title AS Title, role_info.salary AS Salary, role_info.department_id AS Department FROM employee_info, role_info JOIN role_info ON employee_info.id = role_info.id",
    function (err, res) {
      inquirer
        .prompt([
          {
            name: "FirstName",
            type: "input",
            message: "What is the first name?",
          },
          {
            name: "LastName",
            type: "input",
            message: "What is the last name?",
          },
          {
            name: "Role",
            type: "input",
            message: "What is the role ID?",
          },
          {
            name: "ManagerID",
            type: "input",
            message: "What is the manager ID?",
          },
          {
            name: "Title",
            type: "input",
            message: "What is the role title?",
          },
          {
            name: "Salary",
            type: "input",
            message: "What is the salary?",
          },
          {
            name: "Department",
            type: "input",
            message: "What is the department?",
          },
        ])
        .then(function (res) {
          connection.query(
            "INSERT INTO employee_info employee_info.first_name, employee_info.last_name, employee_info.role_id, employee_info.managers_id SELECT role_info.title, role_info.salary, role_info.department_id FROM role_info",
            {
              first_name: res.FirstName,
              last_name: res.LastName,
              role_id: res.Role,
              managers_id: res.ManagerID,
              title: res.Title,
              salary: res.Salary,
              department_id: res.Department,
            },
            function (err) {
              if (err) throw err;
              console.table(res);
              runEmployeeManagment();
            }
          );
        });
    }
  );
}
