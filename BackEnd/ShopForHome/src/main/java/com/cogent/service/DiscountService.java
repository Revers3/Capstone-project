package com.cogent.service;

import java.util.List;

import com.cogent.entity.Discount;

public interface DiscountService {
	//crud
	
	//c
	Discount save(Discount d);
	
	//r
	List<Discount> findAll();
	
	Discount getById(long id);
	
	//need get by product id
	
	//u
	Discount updateDiscount(Discount d);
	
	//d
	void deleteDiscount(long id);
}
