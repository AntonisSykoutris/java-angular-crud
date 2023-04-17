// Importing the required packages and classes from javax.persistence package
package net.resources.springboot.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

// Defining an Entity class "User" with corresponding database table "users"
@Entity
@Table(name = "users")
public class User {

	// Defining the primary key of the table
	@Id
	// Generating the primary key value using database identity columns
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	// Mapping the primary key column in the table to the id field of the class
	@Column(name = "id")
	private int id;

	// Mapping the name column in the table to the name field of the class
	@Column(name = "name")
	private String name;

	@Column(name = "surname")
	private String surname;

	@Column(name = "gender")
	private String gender;

	@Column(name = "birthdate")
	@Temporal(TemporalType.DATE)
	private Date birthdate;

	// Default constructor for the User class
	public User() {
	}

	public User(String name, String surname, String gender, Date birthdate) {
		super();
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.birthdate = birthdate;
	}

	public User(int id, String name, String surname, String gender, Date birthdate) {
		super();
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.birthdate = birthdate;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getBirthdate() {
		return birthdate;
	}

	public void setBirthdate(Date birthdate) {
		this.birthdate = birthdate;
	}

}
