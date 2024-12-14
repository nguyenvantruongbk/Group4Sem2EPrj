package com.example.coffeshop_springboot.service.Order_coffee_service;

import com.example.coffeshop_springboot.entity.Order_coffee_entity.OrderProduct;
import com.example.coffeshop_springboot.repository.Order_coffee_repository.OrderProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderProductService {
    @Autowired
    private OrderProductRepository orderProductRepository;

    public List<OrderProduct> getOrderProductsByOrderId(Integer orderId) {
        return orderProductRepository.findByOrder_OrderId(orderId);
    }
}