package com.cogent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cogent.entity.Product;

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	ProductRepository pRepo;
	
	
	@Override
	public Product save(Product p) {
		// TODO Auto-generated method stub
		System.out.println(p.getCategory());
		System.out.println(p.getName());
		return pRepo.save(p);
	}

	@Override
	public List<Product> findAll() {
		// TODO Auto-generated method stub
		return pRepo.findAll();
	}

	@Override
	public Product updateProduct(Product p) {
		// TODO Auto-generated method stub
		Product pNew = pRepo.save(p);
		return pNew;
	}

	@Override
	public void deleteProduct(long id) {
		// TODO Auto-generated method stub
		pRepo.deleteById(id);
	}

	@Override
	public Product getById(long id) {
		// TODO Auto-generated method stub
		return pRepo.findById(id).get();
	}

}
