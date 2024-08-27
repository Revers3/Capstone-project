package com.cogent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cogent.entity.Order;
import com.cogent.entity.Product;
import com.cogent.entity.User;

@Service
public class OrderServiceImpl implements OrderService{

	@Autowired
	OrderRepository oRepo;
	
	@Autowired
	UserRepository uRepo;
	
	@Autowired
	ProductRepository pRepo;
	
	@SuppressWarnings("deprecation")
	@Override
	public Order save(Order o) {
		// TODO Auto-generated method stub
		// Debug information
	  //System.out.println("Saving Order with User ID: " + o.getUser().getId());
	    System.out.println("Saving Order with Product ID: " + o.getProduct().getId());
	    
	    User u = uRepo.findById(o.getUser().getId()).orElse(null);
	    Product p = pRepo.findById(o.getProduct().getId()).orElse(null);

	    if(p == null) {
	        throw new IllegalArgumentException("Order must have non-null values");
	    }

	   o.setUser(u);
	    o.setProduct(p);
		
		return oRepo.save(o);
	}

	@Override
	public List<Order> findAll() {
		// TODO Auto-generated method stub
		return oRepo.findAll();
	}

	@Override
	public Order getById(long id) {
		// TODO Auto-generated method stub
		return oRepo.findById(id).get();
	}

	@Override
	public Order updateOrder(Order o) {
		// TODO Auto-generated method stub
		Order newOrder = oRepo.save(o);
		return newOrder;
	}

	@Override
	public void deleteOrderById(long id) {
		// TODO Auto-generated method stub
		oRepo.deleteById(id);
	}

	@Override
	public List<Order> findByUserId(long id) {
		// TODO Auto-generated method stub
		return oRepo.findByUserId(id);
	}

}
