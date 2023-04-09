package net.resources.springboot.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "addresses")
public class Address {

	// Defining the primary key of the table
	@Id
	// Mapping the primary key column in the table to the id field of the class
	@Column(name = "id")
	protected int id;
	// Mapping the name column in the table to the name field of the class
	@Column(name = "work")
	protected String work;

	@Column(name = "home")
	protected String home;

	public Address() {
	}

	public Address(int id, String work, String home) {
		super();
		this.id = id;
		this.work = work;
		this.home = home;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getWork() {
		return work;
	}

	public void setWork(String work) {
		this.work = work;
	}

	public String getHome() {
		return home;
	}

	public void setHome(String home) {
		this.home = home;
	}

}