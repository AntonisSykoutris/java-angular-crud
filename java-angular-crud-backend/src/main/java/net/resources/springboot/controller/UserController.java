package net.resources.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.resources.springboot.exception.ResourceNotFoundException;
import net.resources.springboot.model.User;
import net.resources.springboot.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class UserController {

	@Autowired
	private UserRepository UserRepository;

	// get all Users
	@GetMapping("/users")
	public List<User> getAllUsers() {
		return UserRepository.findAll();
	}

	// create User rest api
	@PostMapping("/users")
	public User createUser(@RequestBody User User) {
		return UserRepository.save(User);
	}

	// get User by id rest api
	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable int id) {
		User user = UserRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));
		return ResponseEntity.ok(user);
	}

	// update User rest api

	@PutMapping("/users/{id}")
	public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User UserDetails) {
		User user = UserRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));

		user.setName(UserDetails.getName());
		user.setSurname(UserDetails.getSurname());
		user.setGender(UserDetails.getGender());
		user.setBirthdate(UserDetails.getBirthdate());
		
		User updatedUser = UserRepository.save(user);
		return ResponseEntity.ok(updatedUser);
	}

	// delete User rest api
	@DeleteMapping("/users/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable int id) {
		User user = UserRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));

		UserRepository.delete(user);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

}
