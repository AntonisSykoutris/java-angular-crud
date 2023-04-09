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
import net.resources.springboot.model.Address;
import net.resources.springboot.repository.AddressRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class AddressController {

	@Autowired
	private AddressRepository AddressRepository;

	// get all Addresses
	@GetMapping("/addresses")
	public List<Address> getAllAddresses() {
		return AddressRepository.findAll();
	}

	// create Address rest api
	@PostMapping("/addresses")
	public Address createAddress(@RequestBody Address address) {
		return AddressRepository.save(address);
	}

	// get Address by id rest api
	@GetMapping("/addresses/{id}")
	public ResponseEntity<Address> getAddressById(@PathVariable int id) {
		Address address = AddressRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Address not exist with id :" + id));
		return ResponseEntity.ok(address);
	}

	// update Address rest api

	@PutMapping("/addresses/{id}")
	public ResponseEntity<Address> updateAddress(@PathVariable int id, @RequestBody Address addressDetails) {
		Address address = AddressRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Address not exist with id :" + id));

		address.setWork(addressDetails.getWork());
		address.setHome(addressDetails.getHome());

		Address updatedAddress = AddressRepository.save(address);
		return ResponseEntity.ok(updatedAddress);
	}

	// delete Address rest api
	@DeleteMapping("/addresses/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteAddress(@PathVariable int id) {
		Address address = AddressRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Address not exist with id :" + id));

		AddressRepository.delete(address);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

}

