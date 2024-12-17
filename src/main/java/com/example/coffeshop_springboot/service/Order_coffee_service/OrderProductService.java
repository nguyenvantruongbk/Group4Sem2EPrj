package com.example.coffeshop_springboot.service.Order_coffee_service;

import com.example.coffeshop_springboot.dto.Cart_ReturnDTO;
import com.example.coffeshop_springboot.dto.Return_OderDto;
import com.example.coffeshop_springboot.entity.Order_coffee_entity.Order;
import com.example.coffeshop_springboot.entity.Order_coffee_entity.OrderProduct;
import com.example.coffeshop_springboot.entity.Product_coffee_entity.Product;
import com.example.coffeshop_springboot.repository.Order_coffee_repository.OrderProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderProductService {
    @Autowired
    private OrderProductRepository orderProductRepository;

    public List<OrderProduct> getOrderProductsByOrderId(Integer orderId) {
        return orderProductRepository.findByOrder_OrderId(orderId);
    }

//    public List<Return_OderDto> getOrderProductsByUserId(Long userId) {
//        // Tìm tất cả các đơn hàng của user, sau đó lấy tất cả sản phẩm của những đơn hàng đó
//        return orderProductRepository.findByOrderUserUserId(userId);
//    }

    public List<Return_OderDto> getOrderProductsByUserId(Long userId) {
        // Find all order products by the user's ID
        List<OrderProduct> orderProducts = orderProductRepository.findByOrderUserUserId(userId);

        // Create a map to store the results by order ID
        Map<Integer, Return_OderDto> orderMap = new HashMap<>();

        // Iterate through the order products and group them by orderId
        for (OrderProduct orderProduct : orderProducts) {
            Order order = orderProduct.getOrder();
            Product product = orderProduct.getProduct();

            // If the order hasn't been added yet, initialize a new Return_OderDto
            if (!orderMap.containsKey(order.getOrderId())) {
                Return_OderDto returnOderDto = new Return_OderDto();
                returnOderDto.setOrder(order);
                returnOderDto.setCartReturnDTOS(new ArrayList<>());
                orderMap.put(order.getOrderId(), returnOderDto);
            }

            // Create a Cart_ReturnDTO for this order product
            Cart_ReturnDTO cartReturnDTO = new Cart_ReturnDTO();
            cartReturnDTO.setPrice(orderProduct.getPrice());
            cartReturnDTO.setQuantity(orderProduct.getQuantity());
            cartReturnDTO.setProduct(product);

            // Add the Cart_ReturnDTO to the list in the corresponding Return_OderDto
            orderMap.get(order.getOrderId()).getCartReturnDTOS().add(cartReturnDTO);
        }

        // Return the list of Return_OderDto values
        return new ArrayList<>(orderMap.values());
    }


    public List<Return_OderDto> get_all_oder_product(){
        List<OrderProduct> orderProducts = orderProductRepository.findAll();
        Map<Integer, Return_OderDto> orderMap = new HashMap<>();

        // Iterate through the order products and group them by orderId
        for (OrderProduct orderProduct : orderProducts) {
            Order order = orderProduct.getOrder();
            Product product = orderProduct.getProduct();

            // If the order hasn't been added yet, initialize a new Return_OderDto
            if (!orderMap.containsKey(order.getOrderId())) {
                Return_OderDto returnOderDto = new Return_OderDto();
                returnOderDto.setOrder(order);
                returnOderDto.setCartReturnDTOS(new ArrayList<>());
                orderMap.put(order.getOrderId(), returnOderDto);
            }

            // Create a Cart_ReturnDTO for this order product
            Cart_ReturnDTO cartReturnDTO = new Cart_ReturnDTO();
            cartReturnDTO.setPrice(orderProduct.getPrice());
            cartReturnDTO.setQuantity(orderProduct.getQuantity());
            cartReturnDTO.setProduct(product);

            // Add the Cart_ReturnDTO to the list in the corresponding Return_OderDto
            orderMap.get(order.getOrderId()).getCartReturnDTOS().add(cartReturnDTO);
        }

        // Return the list of Return_OderDto values
        return new ArrayList<>(orderMap.values());
    }

}