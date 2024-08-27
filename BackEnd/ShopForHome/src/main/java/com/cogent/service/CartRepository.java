package com.cogent.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cogent.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long>{
	List<Cart> findCartByUserId(long id);
	void deleteCartsByUserId(long id);
}
