package com.example.coffeshop_springboot.repository.Product_coffee_repository;

import com.example.coffeshop_springboot.entity.Product_coffee_entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
