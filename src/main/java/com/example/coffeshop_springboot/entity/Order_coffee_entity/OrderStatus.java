package com.example.coffeshop_springboot.entity.Order_coffee_entity;

import jakarta.persistence.*;

@Entity
@Table(name = "orderstatus")
public class OrderStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "status_id")
    private int statusId;

    @Column(name = "status_name", nullable = false, length = 50)
    private String statusName;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
}
