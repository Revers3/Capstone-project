package com.cogent.service;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cogent.entity.Discount;

public interface DiscountRepository extends JpaRepository<Discount, Long>{

}
