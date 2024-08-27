package com.cogent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cogent.entity.User;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	UserRepository uRepo;
	
	
	@Override
	public User createUser(User u) {
		// TODO Auto-generated method stub
		return uRepo.save(u);
	}

	@Override
	public List<User> findAll() {
		// TODO Auto-generated method stub
		return uRepo.findAll();
	}

	@Override
	public User getById(long id) {
		// TODO Auto-generated method stub
		return uRepo.findById(id).get();
	}

	@Override
	public User update(User u) {
		// TODO Auto-generated method stub
		User newUser = uRepo.save(u);
		return newUser;
	}

	@Override
	public void deleteById(long id) {
		// TODO Auto-generated method stub
		uRepo.deleteById(id);
	}

	@Override
	public User findByUsername(String username) {
		// TODO Auto-generated method stub
		return uRepo.findByUsername(username);
	}

}
