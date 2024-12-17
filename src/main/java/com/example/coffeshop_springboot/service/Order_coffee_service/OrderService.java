package com.example.coffeshop_springboot.service.Order_coffee_service;

import com.example.coffeshop_springboot.dto.CartDTO;
import com.example.coffeshop_springboot.dto.OrderDTO;
import com.example.coffeshop_springboot.entity.Chain_coffee_entity.Chain;
import com.example.coffeshop_springboot.entity.Order_coffee_entity.Order;
import com.example.coffeshop_springboot.entity.Order_coffee_entity.OrderProduct;
import com.example.coffeshop_springboot.entity.Order_coffee_entity.OrderStatus;
import com.example.coffeshop_springboot.entity.Order_coffee_entity.PaymentMethod;
import com.example.coffeshop_springboot.entity.Product_coffee_entity.Product;
import com.example.coffeshop_springboot.entity.User;
import com.example.coffeshop_springboot.entity.UserAuth;
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

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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
    public Order createOrder(OrderDTO order , UserAuth userAuth) {
        try {
            // Create the order entity
            Order order1 = new Order();

            // Find related entities and handle possible null cases
            OrderStatus orderStatus = orderStatusRepository
                    .findByStatusId(1)
                    .orElseThrow(() -> new RuntimeException("OrderStatus not found for id: " + order.getStatus_id()));



            PaymentMethod paymentMethod = paymentMethodRepository.findByPaymentMethodId(order.getPaymethot_id());


            Chain chain = chainRepository
                    .findByChainId(order.getChian_id())
                    .orElseThrow(() -> new RuntimeException("Chain not found for id: " + order.getChian_id()));


            // Set the properties of the order
            order1.setPaymentMethod(paymentMethod);



            order1.setStatus(orderStatus);
            order1.setUser(userAuth.getUser());
            order1.setChain(chain);
            order1.setTotalAmount(order.getTotalAmount());

            // Save the order
            Order newOrder = orderRepository.save(order1);

            // Return the newly created order
            List<Integer> productIds = order.getProduct().stream()
                    .map(CartDTO::getProductId)
                    .collect(Collectors.toList());

            List<Product> products = productRepository.findByProductIdIn(productIds);

            // Create OrderProduct entities
            List<OrderProduct> orderProducts = order.getProduct()
                    .stream()
                    .map(cartDTO -> {
                        Product product = products.stream()
                                .filter(p -> p.getProductId() == cartDTO.getProductId()) // Use == for int comparison
                                .findFirst()
                                .orElseThrow(() -> new IllegalArgumentException("Invalid product ID: " + cartDTO.getProductId()));
                        OrderProduct orderProduct = new OrderProduct();
                        orderProduct.setProduct(product);
                        orderProduct.setQuantity(cartDTO.getQuantity());
                        orderProduct.setPrice(cartDTO.getPrice());
                        orderProduct.setOrder(newOrder);
                        return orderProduct;
                    })
                    .collect(Collectors.toList());

            // Save all OrderProducts at once
            orderProductRepository.saveAll(orderProducts);


            // Save all OrderProducts at once
            orderProductRepository.saveAll(orderProducts);
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

    public List<Order> getOrdersByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return orderRepository.findOrdersByDateRange(startDate, endDate);
    }



    public List<Order> getOrdersByStatus(String status) {
        return orderRepository.findByStatus(status);
    }


    public void updateOrderStatus(int orderId, int statusId) {
        // Lấy thông tin Order từ database
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        // Lấy thông tin OrderStatus từ database
        OrderStatus status = orderStatusRepository.findById(statusId)
                .orElseThrow(() -> new RuntimeException("OrderStatus not found with id: " + statusId));

        // Cập nhật trạng thái cho Order
        order.setStatus(status);

        // Lưu thay đổi vào database
        orderRepository.save(order);
    }

}


