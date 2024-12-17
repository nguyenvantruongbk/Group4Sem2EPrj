package com.example.coffeshop_springboot.controller.Product_coffee_controller;


import com.example.coffeshop_springboot.dto.ProductDTO;
import com.example.coffeshop_springboot.entity.Order_coffee_entity.Order;
import com.example.coffeshop_springboot.entity.Product_coffee_entity.Product;
import com.example.coffeshop_springboot.repository.Order_coffee_repository.OrderProductRepository;
import com.example.coffeshop_springboot.service.Product_coffee_service.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {



    @Autowired
    private ProductService productService;

    @Autowired
    private OrderProductRepository orderProductRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }



    @PostMapping("/new")
    public Product create_new_Product(@RequestBody ProductDTO productDTO) {
        try{
            return productService.Create_product(productDTO);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id) {
        return productService.getProductById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Transactional
    public void deleteProduct(@PathVariable int id) {
        orderProductRepository.deleteByProduct_ProductId(id);
        productService.deleteProduct(id);
    }

}
