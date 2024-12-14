package com.example.coffeshop_springboot.service.Order_coffee_service;

import com.example.coffeshop_springboot.dto.OrderDTO;
import com.example.coffeshop_springboot.entity.Chain_coffee_entity.Chain;
import com.example.coffeshop_springboot.entity.Order_coffee_entity.Order;
import com.example.coffeshop_springboot.entity.Order_coffee_entity.OrderProduct;
import com.example.coffeshop_springboot.entity.Order_coffee_entity.OrderStatus;
import com.example.coffeshop_springboot.entity.Order_coffee_entity.PaymentMethod;
import com.example.coffeshop_springboot.entity.Product_coffee_entity.Product;
import com.example.coffeshop_springboot.entity.User;
import com.example.coffeshop_springboot.repository.Chain_coffee_repository.Chain_Repository;
import com.example.coffeshop_springboot.repository.Order_coffee_repository.OrderProductRepository;
import com.example.coffeshop_springboot.repository.Order_coffee_repository.OrderRepository;
import com.example.coffeshop_springboot.repository.Order_coffee_repository.OrderStatusRepository;
import com.example.coffeshop_springboot.repository.Order_coffee_repository.PaymentMethodRepository;
import com.example.coffeshop_springboot.repository.Product_coffee_repository.ProductRepository;
import com.example.coffeshop_springboot.repository.User_Repository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private User_Repository userRepository;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderProductRepository orderProductRepository;
    @Autowired
    private OrderStatusRepository orderStatusRepository;

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Autowired
    private Chain_Repository chainRepository;







    @Transactional
    public Order createOrder(OrderDTO order) {
        try {
            // Create the order entity
            Order order1 = new Order();

            // Find related entities and handle possible null cases
            OrderStatus orderStatus = orderStatusRepository
                    .findByStatusId(order.getStatus_id())
                    .orElseThrow(() -> new RuntimeException("OrderStatus not found for id: " + order.getStatus_id()));

            User user = userRepository
                    .findByUserId(order.getUser_Id())
                    .orElseThrow(() -> new RuntimeException("User not found for id: " + order.getUser_Id()));

            PaymentMethod paymentMethod = paymentMethodRepository.findByPaymentMethodId(order.getPaymethot_id());


            Chain chain = chainRepository
                    .findByChainId(order.getChian_id())
                    .orElseThrow(() -> new RuntimeException("Chain not found for id: " + order.getChian_id()));

            // Set the properties of the order
            order1.setPaymentMethod(paymentMethod);
            order1.setStatus(orderStatus);
            order1.setUser(user);
            order1.setChain(chain);
            order1.setTotalAmount(order.getTotalAmount());

            // Save the order
            Order newOrder = orderRepository.save(order1);

            // Find the product and handle possible null case
            Product product = productRepository
                    .findByProductId(order.getProduct_Id())
                    .orElseThrow(() -> new RuntimeException("Product not found for id: " + order.getProduct_Id()));

            // Create and save the OrderProduct
            OrderProduct orderProduct = new OrderProduct();
            orderProduct.setOrder(newOrder);
            orderProduct.setProduct(product);
            orderProduct.setQuantity(order.getQuantity());
            orderProduct.setPrice(order.getPrice());
            orderProductRepository.save(orderProduct);

            // Return the newly created order
            return newOrder;
        } catch (Exception e) {
            // Log the error for better debugging
            System.err.println("Error creating order: " + e.getMessage());
            throw new RuntimeException("Error creating order", e);
        }
    }


    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }


    public  Order change_Status(Integer Order_id,Integer Status_id){
        try {

            return  null;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    public List<Order> getOrdersByStatus(String status) {
        return orderRepository.findByStatus(status);
    }
}


