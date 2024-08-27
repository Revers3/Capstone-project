package com.cogent.service;

import java.util.List;

import com.cogent.entity.Cart;

public interface CartService {
	
	//c
	Cart save(Cart c);
	
	//r
	List<Cart> findAll();
	
	List<Cart> findAllByUserId(long id);
	
	//u
	Cart update(Cart c);
	
	//d
	void deleteCart(long id);
	
	void deleteAllByUserId(long id);
	
}
