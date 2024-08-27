package com.cogent.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.cogent.entity.Wishlist;

public interface WishlistRepository extends JpaRepository<Wishlist, Long>{
	List<Wishlist> findByUserId(long userId);
}
