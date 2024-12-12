package com.example.coffeshop_springboot.controller.Product_coffee_controller;


import com.example.coffeshop_springboot.entity.Product_coffee_entity.Product;
import com.example.coffeshop_springboot.service.Product_coffee_service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id) {
        return productService.getProductById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable int id) {
        productService.deleteProduct(id);
    }
}
