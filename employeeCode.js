let mysql = require("mysql");
let inquirer = require("inquirer");

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
  inquirer
    .prompt({
      name: "artist",
      type: "input",
      message: "What Deparment would you like to check?",
    })
    .then(function (answer) {
      let query = "SELECT position, song, year FROM top5000 WHERE ?";
      connection.query(query, { artist: answer.artist }, function (err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Position: " +
              res[i].position +
              " || Song: " +
              res[i].song +
              " || Year: " +
              res[i].year
          );
        }
        runEmployeeManagment();
      });
    });
}
