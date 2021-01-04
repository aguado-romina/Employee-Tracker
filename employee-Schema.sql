DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department_info
(
    id INT NOT NULL,
    department_name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role_info
(
    id INT NOT NULL,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,4) NULL,
    department_id DECIMAL(10,4) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee_info
(
    id INT NOT NULL,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NOT NULL,
    managers_id INT NOT NULL,
    PRIMARY KEY (id)
);


SELECT *
FROM department_info;
select *
from role_info;
select *
from employee_info;
