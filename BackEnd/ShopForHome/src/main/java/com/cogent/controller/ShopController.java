package com.cogent.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.cogent.dtos.LoginUserDto;

import com.cogent.dtos.RegisterUserDto;
import com.cogent.entity.Cart;
import com.cogent.entity.Discount;
import com.cogent.entity.LoginResponse;
import com.cogent.entity.Order;
import com.cogent.entity.Product;
import com.cogent.entity.User;
import com.cogent.entity.Wishlist;
import com.cogent.service.AuthenticationService;
import com.cogent.service.CartService;
import com.cogent.service.DiscountService;
import com.cogent.service.JwtService;
import com.cogent.service.OrderService;
import com.cogent.service.ProductService;
import com.cogent.service.UserService;
import com.cogent.service.WishlistService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/shop")
@CrossOrigin
public class ShopController {

	// importing services


	@Autowired
	UserService uSer;

	@Autowired
	DiscountService dSer;

	@Autowired
	WishlistService wSer;

	@Autowired
	ProductService pSer;

	@Autowired
	OrderService oSer;
	
	@Autowired
	CartService cSer;

	@Autowired
	JwtService jSer;

	@Autowired
	AuthenticationService authSer;

//================================================
//			User Operations

	/*
	@PostMapping("/user/add")
	@Transactional
	public User saveUser(@RequestBody User u) throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		if (authentication != null) {
			return uSer.createUser(u);
		} else {
			throw new Exception("User is not authenticated.");
		}

	} */

	@GetMapping("/user/all")
	public ResponseEntity<List<User>> findAllUsers() throws Exception {
		
			List<User> response = uSer.findAll();
			return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/user/get/{username}")
	public ResponseEntity<User> findUserByUsername(@PathVariable String username) throws Exception {
		
		
			System.out.println("Authenticated!");
			User response = uSer.findByUsername(username);
			return new ResponseEntity<>(response, HttpStatus.OK);

	}

	

	@PutMapping("/user/update/{id}")
	@Transactional
	public ResponseEntity<?> updateUser(@RequestBody LoginUserDto loginUserDto, @PathVariable long id) throws Exception {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	    
	    if (authentication != null && authentication.isAuthenticated()) {
	       
	        // Fetch the existing user from the database
	    	User existingUser = uSer.getById(id);

	        // Check if the user exists
	        if (existingUser != null) {
	            // Update user details with data from LoginUserDto
	            existingUser.setUsername(loginUserDto.getUsername());
	            existingUser.setPassword(loginUserDto.getPassword()); // Consider password encoding

	            // Save and return the updated user
	            User updatedUser = uSer.createUser(existingUser);
	            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
	        } else {
	            
	            throw new Exception("User not found.");
	        }
	    } else {
	        // Handle case where authentication fails
	        throw new Exception("User is not authenticated.");
	    }

	}

	@DeleteMapping("/user/delete/{id}")
	@Transactional
	public ResponseEntity<?> deleteUser(@PathVariable long id)  {
		
			uSer.deleteById(id);
			return new ResponseEntity<>(HttpStatus.OK);
		

	}

//===========================================================
//				Product Operations

	@PostMapping("/product/add")
	@Transactional
	public ResponseEntity<Product> saveProduct(@RequestBody Product p)  {
		Product response = pSer.save(p);
			return new ResponseEntity<>(response, HttpStatus.OK);
		
	}

	@GetMapping("/product/all")
	public ResponseEntity<List<Product>> findAllProducts()
	{
		List<Product> response = pSer.findAll();
		return new ResponseEntity<>(response, HttpStatus.OK);
		
	}

	@GetMapping("/product/get/{id}")
	public ResponseEntity<Product> findProdById(@PathVariable long id) throws Exception {
		
		Product response = pSer.getById(id);
		return new ResponseEntity<>(response, HttpStatus.OK);
		
	}

	@PutMapping("/product/update")
	@Transactional
	public ResponseEntity<Product> updateProd(@RequestBody Product p){
	
		Product response = pSer.updateProduct(p);
		return new ResponseEntity<>(response, HttpStatus.OK);
		
	}

	@DeleteMapping("/product/delete/{id}")
	public ResponseEntity<?> deleteProd(@PathVariable long id) {
		
		pSer.deleteProduct(id);
		return new ResponseEntity<>(HttpStatus.OK);
		
	}

//==========================================================
//			Discount Operations

	@PostMapping("/discount/add")
	@Transactional
	public ResponseEntity<Discount> saveDiscount(@RequestBody Discount d) {
		Discount response = dSer.save(d);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
		

	@GetMapping("/discount/all")
	public ResponseEntity<List<Discount>> findAll(){
		
		List<Discount> response = dSer.findAll();
		return new ResponseEntity<>(response, HttpStatus.OK);
		
	}

	@GetMapping("/discount/get/{id}")
	public ResponseEntity<Discount> getById(@PathVariable long id) throws Exception {
		Discount response = dSer.getById(id);
		return new ResponseEntity<>(response, HttpStatus.OK);
		
	}

	@PutMapping("/discount/update")
	@Transactional
	public ResponseEntity<Discount> updateDiscount(@RequestBody Discount d) throws Exception {
		
		Discount dNew = dSer.updateDiscount(d);
		return new ResponseEntity<>(dNew, HttpStatus.OK);
	}

	@DeleteMapping("/discount/delete/{id}")
	@Transactional
	public ResponseEntity<?> deleteDiscount(@PathVariable long id) throws Exception {
		
		dSer.deleteDiscount(id);
		return new ResponseEntity<>( HttpStatus.OK);
		
	}

//===============================================================
//			Order Operations

	@PostMapping("/order/add/{userId}")
	@Transactional
	public ResponseEntity<Order> saveOrder(@RequestBody Order o, @PathVariable long userId) {
		
		User u = uSer.getById(userId);
		o.setUser(u);
		Order response = oSer.save(o);
		return new ResponseEntity<>(response, HttpStatus.OK);
		
	}

	@GetMapping("/order/all")
	public ResponseEntity<List<Order>> findAllOrder(){
		List<Order> response = oSer.findAll();
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/order/get/{id}")
	public ResponseEntity<Order> findById(@PathVariable long id)  {
		
		Order response = oSer.getById(id);
		return new ResponseEntity<>(response, HttpStatus.OK);
		
	}

	@GetMapping("/order/getByUser/{id}")
	public ResponseEntity<List<Order>> findOrderByUser(@PathVariable long id)  {
		List<Order> response = oSer.findByUserId(id);
		return new ResponseEntity<>(response, HttpStatus.OK);
		
	}

	@PutMapping("/order/update")
	@Transactional
	public ResponseEntity<Order> updateOrder(@RequestBody Order o)  {
		Order oNew = oSer.updateOrder(o);
		return new ResponseEntity<>(oNew, HttpStatus.OK);
		
	}

	@DeleteMapping("/order/delete/{id}")
	@Transactional
	public ResponseEntity<?> deleteOrder(@PathVariable long id)  {
		
		oSer.deleteOrderById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

//=========================================================
//				Wishlist Operations

	@PostMapping("/wishlist/add/{id}")
	@Transactional
	public ResponseEntity<Wishlist> addWish(@RequestBody Wishlist w, @PathVariable long id)  {
		
		User u = uSer.getById(id);
		w.setUser(u);
		Wishlist response = wSer.save(w);
		return new ResponseEntity<>(response, HttpStatus.OK);
		
		
		
	}

	@GetMapping("/wishlist/all")
	public ResponseEntity<List<Wishlist>> findAllWishlist()  {
		List<Wishlist> response = wSer.findAll();
		return new ResponseEntity<>(response, HttpStatus.OK);
		
	}

	@GetMapping("/wishlist/{id}")
	public ResponseEntity<Wishlist> getByWishId(@PathVariable long id)  {
		
		Wishlist response = wSer.findById(id);
		return new ResponseEntity<>(response, HttpStatus.OK);
		
	}

	@GetMapping("/wishlist/all/{id}")
	public ResponseEntity<List<Wishlist>> findAllByUserId(@PathVariable long id)  {
		List<Wishlist> response = wSer.findByUserId(id);
		return new ResponseEntity<>(response, HttpStatus.OK);
		
	}

	@PutMapping("/wishlist/update")
	@Transactional
	public ResponseEntity<Wishlist> updateWishList(@RequestBody Wishlist w)  {
		
		Wishlist wNew = wSer.save(w);
		return new ResponseEntity<>(wNew, HttpStatus.OK);
		
	}

	@DeleteMapping("/wishlist/delete/{id}")
	@Transactional
	public ResponseEntity<?> deleteWishlistById(@PathVariable long id) {
		
		
		wSer.deleteById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

//===========================================================================
	// login operations

	@PostMapping("/signup")
	public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
		User registeredUser = authSer.signup(registerUserDto);

		return ResponseEntity.ok(registeredUser);
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
		User authenticatedUser = authSer.authenticate(loginUserDto);

		String jwtToken = jSer.generateToken(authenticatedUser);

		LoginResponse loginResponse = new LoginResponse();
		loginResponse.setToken(jwtToken);
		loginResponse.setExpiresIn(jSer.getExpirationTime());

		return ResponseEntity.ok(loginResponse);
	}
	
	
//============================================================================================
	//				cart operations
	
	@PostMapping("/cart/add/{id}")
	@Transactional
	public ResponseEntity<Cart> addCartItem(@RequestBody Cart c, @PathVariable long id) 
	{
		
			User u = uSer.getById(id);
			c.setUser(u);
			System.out.println("Cart Add Authenticated");
			Cart response = cSer.save(c);
			return new ResponseEntity<>(response, HttpStatus.OK);
		
	}
	
	@GetMapping("/cart/allItem")
	public ResponseEntity<List<Cart>> getAllCartItems() throws Exception
	{
		List<Cart> response = cSer.findAll();
			return new ResponseEntity<>(response, HttpStatus.OK);
		
	}
	
	@GetMapping("/cart/all/{id}")
	public ResponseEntity<List<Cart>> getAllCartItemsById(@PathVariable long id) 
	{
		List<Cart> response = cSer.findAllByUserId(id);
			return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@DeleteMapping("/cart/delete/{id}")
	@Transactional
	public ResponseEntity<?> deleteCartById(@PathVariable long id)
	{
		
			cSer.deleteCart(id);
			return new ResponseEntity<>(HttpStatus.OK);
		
	}
	
	@DeleteMapping("/cart/clear/{userId}")
	@Transactional
	public ResponseEntity<?> wipeUserCart(@PathVariable long userId)
	{
		
			cSer.deleteAllByUserId(userId);
			return new ResponseEntity<>(HttpStatus.OK);
		
	}
	
	
	

}
