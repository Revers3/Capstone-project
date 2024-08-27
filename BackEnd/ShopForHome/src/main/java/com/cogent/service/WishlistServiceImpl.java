package com.cogent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cogent.entity.Product;
import com.cogent.entity.User;
import com.cogent.entity.Wishlist;

@Service
public class WishlistServiceImpl implements WishlistService {

	@Autowired
	WishlistRepository wRepo;

	@Autowired
	UserRepository uRepo;

	@Autowired
	ProductRepository pRepo;

	@SuppressWarnings("deprecation")
	@Override
	public Wishlist save(Wishlist w) {
		// TODO Auto-generated method stub

		User u = uRepo.getById(w.getUser().getId());

		Product p = pRepo.getById(w.getProduct().getId());
		
		w.setUser(u);
		w.setProduct(p);
		
		return wRepo.save(w);
	}

	@Override
	public List<Wishlist> findAll() {
		// TODO Auto-generated method stub
		return wRepo.findAll();
	}

	@Override
	public Wishlist findById(long id) {
		// TODO Auto-generated method stub
		return wRepo.findById(id).get();
	}

	@Override
	public List<Wishlist> findByUserId(long id) {
		// TODO Auto-generated method stub
		return wRepo.findByUserId(id);
	}

	@Override
	public Wishlist update(Wishlist w) {
		// TODO Auto-generated method stub
		Wishlist wNew = wRepo.save(w);
		return wNew;
	}

	@Override
	public void deleteById(long id) {
		// TODO Auto-generated method stub
		wRepo.deleteById(id);

	}

}
