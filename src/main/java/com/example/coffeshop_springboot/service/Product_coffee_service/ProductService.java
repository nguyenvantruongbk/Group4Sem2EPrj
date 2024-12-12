package com.example.coffeshop_springboot.service.Product_coffee_service;

import com.example.coffeshop_springboot.entity.Product_coffee_entity.Product;
import com.example.coffeshop_springboot.repository.Product_coffee_repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Optional<Product> getProductById(int id) {
        return productRepository.findById(id);
    }

    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }
}