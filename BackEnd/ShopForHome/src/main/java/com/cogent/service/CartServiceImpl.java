package com.cogent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cogent.entity.Cart;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	CartRepository cRepo;

	@Override
	public Cart save(Cart c) {
		// TODO Auto-generated method stub
		return cRepo.save(c);
	}

	@Override
	public List<Cart> findAll() {
		// TODO Auto-generated method stub
		return cRepo.findAll();
	}

	@Override
	public List<Cart> findAllByUserId(long id) {
		// TODO Auto-generated method stub
		return cRepo.findCartByUserId(id);
	}

	@Override
	public Cart update(Cart c) {
		// TODO Auto-generated method stub
		Cart newC = cRepo.save(c);
		return newC;
	}

	@Override
	public void deleteCart(long id) {
		// TODO Auto-generated method stub
		cRepo.deleteById(id);
	}

	@Override
	public void deleteAllByUserId(long id) {
		// TODO Auto-generated method stub
		cRepo.deleteCartsByUserId(id);
		
	}
}
