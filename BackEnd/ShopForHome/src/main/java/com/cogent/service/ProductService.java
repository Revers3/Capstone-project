package com.cogent.service;

import java.util.List;

import com.cogent.entity.Product;

public interface ProductService {
	//crud
	
	//c
	Product save(Product p);
	
	//r
	List<Product> findAll();
	
	Product getById(long id);
	
	//u
	Product updateProduct(Product p);
	
	//d
	void deleteProduct(long id);
}
