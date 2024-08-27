package com.cogent.service;

import java.util.List;

import com.cogent.entity.Order;

public interface OrderService {
	//crud
	
	//c
	Order save(Order o);
	
	//r
	List<Order> findAll();
	
	Order getById(long id);
	
	//finding all orders by user id
	List<Order> findByUserId(long id);
	
	//u
	Order updateOrder(Order o);
	
	//d
	void deleteOrderById(long id);
}
