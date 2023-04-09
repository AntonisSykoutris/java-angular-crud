package net.resources.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.resources.springboot.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

}
