package com.example.coffeshop_springboot.dto;

import com.example.coffeshop_springboot.entity.Product_coffee_entity.Product;

import java.math.BigDecimal;

public class Cart_ReturnDTO {
    private BigDecimal price;
    private int quantity;
    private Product product;

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
