package com.example.coffeshop_springboot.dto;

import java.math.BigDecimal;

public class OrderDTO {
    private Long user_Id;
    private int product_Id;
    private Long chian_id;
    private int status_id;
    private int paymethot_id;


    private int quantity;
    private BigDecimal price;
    private BigDecimal totalAmount;




    public Long getUser_Id() {
        return user_Id;
    }

    public void setUser_Id(Long user_Id) {
        this.user_Id = user_Id;
    }

    public int getProduct_Id() {
        return product_Id;
    }

    public void setProduct_Id(int product_Id) {
        this.product_Id = product_Id;
    }

    public Long getChian_id() {
        return chian_id;
    }

    public void setChian_id(Long chian_id) {
        this.chian_id = chian_id;
    }

    public int getStatus_id() {
        return status_id;
    }

    public void setStatus_id(int status_id) {
        this.status_id = status_id;
    }

    public int getPaymethot_id() {
        return paymethot_id;
    }

    public void setPaymethot_id(int paymethot_id) {
        this.paymethot_id = paymethot_id;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }


}
