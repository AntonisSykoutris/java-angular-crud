package net.resources.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import net.resources.springboot.model.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer>{

}
