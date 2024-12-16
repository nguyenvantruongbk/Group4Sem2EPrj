package com.example.coffeshop_springboot.dto;

import com.example.coffeshop_springboot.entity.Order_coffee_entity.Order;

import java.util.List;

public class Return_OderDto {
    private Order order;
    private List<Cart_ReturnDTO> cartReturnDTOS;

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public List<Cart_ReturnDTO> getCartReturnDTOS() {
        return cartReturnDTOS;
    }

    public void setCartReturnDTOS(List<Cart_ReturnDTO> cartReturnDTOS) {
        this.cartReturnDTOS = cartReturnDTOS;
    }
}
