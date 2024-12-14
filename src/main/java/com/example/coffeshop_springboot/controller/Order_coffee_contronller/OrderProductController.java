package com.example.coffeshop_springboot.controller.Order_coffee_contronller;

import com.example.coffeshop_springboot.entity.Order_coffee_entity.OrderProduct;
import com.example.coffeshop_springboot.service.Order_coffee_service.OrderProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/order-products")
public class OrderProductController {
    @Autowired
    private OrderProductService orderProductService;

    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<OrderProduct>> getOrderProductsByOrderId(@PathVariable Integer orderId) {
        List<OrderProduct> orderProducts = orderProductService.getOrderProductsByOrderId(orderId);
        return new ResponseEntity<>(orderProducts, HttpStatus.OK);
    }
}
