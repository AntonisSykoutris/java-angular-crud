# Java Spring Boot Angular CRUD Web Application
This is a web application built using the Java Spring Boot framework on the backend and Angular on the frontend. The purpose of this application is to perform CRUD (Create, Read, Update, Delete) operations on a database of users and their addresses.

## Prerequisites
Before you can run this application, you'll need to have the following software installed on your machine:

- Java JDK 8 or later
- Node.js 10 or later
- Angular CLI
- MySQL database
- MySQL Workbench
- Spring Tool Suite 4
## Getting started
To get started with this application, follow these steps:

- Clone the repository to your local machine.
- Open MySQL Workbench and create a new schema named europeandynamicsdb.
- Run the SQL script located in backend/src/main/resources/schema.sql to create the users and addresses tables in the europeandynamicsdb schema.
- Navigate to the backend directory in Spring Tool Suite 4 and run the project to start the Spring Boot backend.
- Navigate to the frontend directory and run ng serve to start the Angular frontend.
- Open your web browser and go to http://localhost:4200 to access the application.
## Database Structure
This application uses a MySQL database with the following tables:

### Users
The users table contains the following columns:

| Column     | Type | Description |
| ---------- | ---- |----------------------------------------------------- |
| id | INT | Unique identifier for each user
| name | VARCHAR(255) | First name of the user
| surname | VARCHAR(255) | Last name of the user
| gender | ENUM('M','F') | Gender of the user (M for male, F for female)
| birthdate | DATE | Date of birth of the user

The SQL script to create the users table is as follows:
```sql
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  gender ENUM('M', 'F') NOT NULL,
  birthdate DATE NOT NULL,
  PRIMARY KEY (id)
);
```
### Addresses
The addresses table contains the following columns:

| Column     | Type | Description |
| ---------- | ---- |----------------------------------------------------- |
| id | INT | Unique identifier for each user
| work | VARCHAR(255) | Address of the user's workplace
| home | VARCHAR(255) | Address of the user's home

The id column in the addresses table is a foreign key referencing the id column in the users table.

The SQL script to create the addresses table is as follows:
```sql
CREATE TABLE addresses (
  id INT NOT NULL,
  work VARCHAR(255),
  home VARCHAR(255),
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES users(id)
);
```

## Features
This application has the following features:

- List all users and their addresses in the database.
- Add a new user and address to the database.
- Edit an existing user and address in the database.
- Delete a user and their address from the database.
- List a user and his/her addresses in the database.
## Technologies used
This application uses the following technologies:

- Java Spring Boot - Backend framework
- Angular - Frontend framework
- MySQL - Database
- JPA/Hibernate - Object-relational mapping tool
- Bootstrap - CSS framework