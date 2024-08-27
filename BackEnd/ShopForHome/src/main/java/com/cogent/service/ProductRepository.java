package com.cogent.service;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cogent.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
	
}
