package com.cogent.service;

import java.util.List;

import com.cogent.entity.Wishlist;

public interface WishlistService {
	//crud
	
	//c
	Wishlist save(Wishlist w);
	
	//r
	List<Wishlist> findAll();
	
	Wishlist findById(long id);
	
	List<Wishlist> findByUserId(long id);
	
	//u
	Wishlist update(Wishlist w);
	//d
	void deleteById(long id);
}
