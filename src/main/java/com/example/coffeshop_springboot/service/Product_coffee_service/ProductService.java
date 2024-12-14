package com.example.coffeshop_springboot.service.Product_coffee_service;

import com.example.coffeshop_springboot.dto.ProductDTO;
import com.example.coffeshop_springboot.entity.Chain_coffee_entity.Chain;
import com.example.coffeshop_springboot.entity.Product_coffee_entity.Menu;
import com.example.coffeshop_springboot.entity.Product_coffee_entity.Product;
import com.example.coffeshop_springboot.repository.Chain_coffee_repository.Chain_Repository;
import com.example.coffeshop_springboot.repository.Product_coffee_repository.MenuRepository;
import com.example.coffeshop_springboot.repository.Product_coffee_repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private Chain_Repository chainRepository;



    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Optional<Product> getProductById(int id) {
        return productRepository.findById(id);
    }

    public Product Create_product(ProductDTO productDTO){
        try {
            Product product = new Product();
            product.setName(productDTO.getName());
            product.setImg(productDTO.getImg());
            product.setPrice(productDTO.getPrice());
            product.setDescription(productDTO.getDescription());
            product.setStock(productDTO.getStock());

            Chain chain = chainRepository.findByChainId(productDTO.getChian_id()).get();
            Product newproduct =  productRepository.save(product);

            Menu menu = new Menu();
            menu.setProduct(newproduct);
            menu.setChain(chain);

            menuRepository.save(menu);

            return newproduct;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }







    }

    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }
}