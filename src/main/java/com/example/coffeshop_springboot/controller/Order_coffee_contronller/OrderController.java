package com.example.coffeshop_springboot.controller.Order_coffee_contronller;

import com.example.coffeshop_springboot.dto.OrderDTO;
import com.example.coffeshop_springboot.entity.Order_coffee_entity.Order;
import com.example.coffeshop_springboot.entity.UserAuth;
import com.example.coffeshop_springboot.repository.UserAuth_Repository;
import com.example.coffeshop_springboot.service.Order_coffee_service.OrderService;
import com.example.coffeshop_springboot.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserAuth_Repository userAuthRepository;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderDTO order,@RequestHeader("Authorization") String token) {
        String jwtToken = token.replace("Bearer ", "");
        UserAuth userAuth_token = jwtUtil.extractUserAuth(jwtToken);
        UserAuth userAuth = userAuthRepository.findByAuth_id(userAuth_token.getAuth_id()).get();

        Order newOrder = orderService.createOrder(order,userAuth);
        return new ResponseEntity<>(newOrder, HttpStatus.OK);
    }



    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
//    @GetMapping("/status/")
//    public ResponseEntity<List<Order>> getOrdersByStatus(@RequestBody OrderDTO order) {
//        try {
//
//        }catch (Exception exception){
//
//        }
//    }
}