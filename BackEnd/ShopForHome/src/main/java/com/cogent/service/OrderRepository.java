package com.cogent.service;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cogent.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	List<Order> findByUserId(long userId);
}
