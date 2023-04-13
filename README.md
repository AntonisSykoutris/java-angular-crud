# Java Spring Boot Angular CRUD Web Application(UserNexus)
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
- Run the SQL script located in backend/src/main/resources/schema.sql to create the java_angular_crud_db schema,  users and addresses tables.
- Navigate to the backend directory in Spring Tool Suite 4 and run the project to start the Spring Boot backend.
- Navigate to the frontend directory and run ng serve to start the Angular frontend.
- Open your web browser and go to http://localhost:4200 to access the application.

## Features
This application has the following features:

- List all users and their addresses in the database.
- Add a new user and address to the database.
- Edit an existing user and address in the database.
- Delete a user and their address from the database.
- List a user and his/her addresses in the database.
- Search for a user in the users table.
- Sort users based on their name or surname.
- Paginate the table of users.

## Technologies used
This application uses the following technologies:

- Java Spring Boot - Backend framework
- Angular - Frontend framework
- MySQL - Database
- JPA/Hibernate - Object-relational mapping tool
- Bootstrap - CSS framework
