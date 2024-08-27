package com.cogent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cogent.entity.Discount;
import com.cogent.entity.Product;

@Service
public class DiscountServiceImpl implements DiscountService{

	@Autowired
	DiscountRepository dRepo;
	
	@Autowired
	ProductRepository pRepo;
	
	@SuppressWarnings("deprecation")
	@Override
	public Discount save(Discount d) {
		// TODO Auto-generated method stub
		
		Product p = pRepo.getById(d.getProduct().getId());
		
		d.setProduct(p);
		
		return dRepo.save(d);
	}

	@Override
	public List<Discount> findAll() {
		// TODO Auto-generated method stub
		return dRepo.findAll();
	}

	@Override
	public Discount getById(long id) {
		// TODO Auto-generated method stub
		return dRepo.findById(id).get();
	}

	@Override
	public Discount updateDiscount(Discount d) {
		// TODO Auto-generated method stub
		Discount dNew = dRepo.save(d);
		return dNew;
	}

	@Override
	public void deleteDiscount(long id) {
		// TODO Auto-generated method stub
		dRepo.deleteById(id);
	}

}
