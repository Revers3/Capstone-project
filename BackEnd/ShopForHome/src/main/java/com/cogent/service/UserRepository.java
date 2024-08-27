package com.cogent.service;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cogent.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
	User findByUsername(String username);
}
