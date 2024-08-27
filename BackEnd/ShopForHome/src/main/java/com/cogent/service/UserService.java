package com.cogent.service;

import java.util.List;

import com.cogent.entity.User;

public interface UserService {
	//crud functions
	
	//c
	User createUser(User u);
	
	//r
	List<User> findAll();
	
	User getById(long id);
	
	User findByUsername(String username);
	//u
	
	User update(User u);
	
	//d
	void deleteById(long id);
}
