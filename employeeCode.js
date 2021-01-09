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
    "SELECT employee_info.first_name, employee_info.last_name, employee_info.role_id, employee_info.managers_id, role_info.title, role_info.salary, role_info.department_id FROM employee_info left JOIN role_info ON employee_info.role_id = role_info.id";

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
  connection.query("SELECT * FROM role_info", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the employee fist name? ",
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the employee last name? ",
        },
        {
          name: "managers_id",
          type: "input",
          message: "What is the manager ID? ",
        },
        {
          name: "role",
          type: "list",
          choices: function () {
            let roleArray = [];
            for (let i = 0; i < res.length; i++) {
              roleArray.push(res[i].title);
            }
            return roleArray;
          },
          message: "What is this employee role ID? ",
        },
      ])
      .then(function (answer) {
        let role_id;
        for (let a = 0; a < res.length; a++) {
          if (res[a].title == answer.role) {
            role_id = res[a].id;
            console.log(role_id);
          }
        }
        connection.query(
          "INSERT INTO employee_info SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            managers_id: answer.managers_id,
            role_id: role_id,
          },
          function (err) {
            if (err) throw err;
            console.table(res);
            runEmployeeManagment();
          }
        );
      });
  });
}
function updateEmployeeRoles() {
  let allemp = [];
  connection.query("SELECT * FROM employee_info", function (err, answer) {
    // console.log(answer);
    for (let i = 0; i < answer.length; i++) {
      let employeeString =
        answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name;
      allemp.push(employeeString);
    }
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "updateEmployeeRoles",
          message: "select employee to update role",
          choices: allemp,
        },
        {
          type: "list",
          message: "select new role",
          choices: ["Manager", "Sales Lead"],
          name: "newrole",
        },
      ])
      .then(function (answer) {
        console.log("about to update", answer);
        const idToUpdate = {};
        idToUpdate.employeeId = parseInt(
          answer.updateEmployeeRoles.split(" ")[0]
        );
        if (answer.newrole === "Manager") {
          idToUpdate.role_id = 196;
        } else if (answer.newrole === "Sales Lead") {
          idToUpdate.role_id = 278;
        }
        connection.query(
          "UPDATE employee_info SET role_id = ? WHERE id = ?",
          [idToUpdate.role_id, idToUpdate.employeeId],
          function (err, data) {
            runEmployeeManagment();
          }
        );
      });
  });
}
