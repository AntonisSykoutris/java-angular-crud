CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  gender ENUM('M', 'F') NOT NULL,
  birthdate DATE NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE addresses (
  id INT NOT NULL,
  work VARCHAR(255),
  home VARCHAR(255),
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES users(id)
);
