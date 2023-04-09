
# Backend

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

## API Endpoints

The application provides the following RESTful API endpoints:

- GET /users - Returns a list of all users with their address.
- POST /users - Creates a new user with their address.
- PUT /users/{id} - Updates a user's information or address.
- DELETE /users/{id} - Deletes a user.

- GET /addresses - Returns a list of all addresses.
- POST /addresses - Creates a new address.
- PUT /addresses/{id} - Updates an address information or address.
- DELETE /addresses/{id} - Deletes a address.
