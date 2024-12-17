package com.example.coffeshop_springboot.controller.Order_coffee_contronller;

import com.example.coffeshop_springboot.dto.OrderDTO;
import com.example.coffeshop_springboot.dto.UpdateOrderStatusDTO;
import com.example.coffeshop_springboot.entity.Order_coffee_entity.Order;
import com.example.coffeshop_springboot.entity.UserAuth;
import com.example.coffeshop_springboot.repository.UserAuth_Repository;
import com.example.coffeshop_springboot.service.Order_coffee_service.OrderService;
import com.example.coffeshop_springboot.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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



    @GetMapping("/order_date")
    public List<Order> getOrdersByDate(
        @RequestParam("startDate") String startDate,
        @RequestParam("endDate") String endDate) {
        LocalDateTime start = LocalDateTime.parse(startDate);
        LocalDateTime end = LocalDateTime.parse(endDate);
        return orderService.getOrdersByDateRange(start, end);
    }

    @PutMapping("/update_status")
    public ResponseEntity<String> updateOrderStatus(@RequestBody UpdateOrderStatusDTO dto) {
        try {
            orderService.updateOrderStatus(dto.getOrderId(), dto.getStatusId());
            return ResponseEntity.ok("Order status updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
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