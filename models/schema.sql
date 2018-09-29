DROP DATABASE IF EXISTS students_db;
CREATE DATABASE students_db;

CREATE TABLE students
(
	id int NOT NULL AUTO_INCREMENT,
	firstname varchar(255) NOT NULL,
	lastname varchar(255) NOT NULL,
  teacher varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE staff
(
	id int NOT NULL AUTO_INCREMENT,
	firstname varchar(255) NOT NULL,
	lastname varchar(255) NOT NULL,
    authority varchar(255) NOT NULL,
	PRIMARY KEY (id)
);