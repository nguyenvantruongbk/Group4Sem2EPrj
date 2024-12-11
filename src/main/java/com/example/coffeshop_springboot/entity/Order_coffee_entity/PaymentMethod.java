package com.example.coffeshop_springboot.entity.Order_coffee_entity;


import jakarta.persistence.*;

@Entity
@Table(name = "paymentmethod")
public class PaymentMethod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_method_id")
    private int paymentMethodId;

    @Column(name = "method_name", nullable = false, length = 50)
    private String methodName;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
}
