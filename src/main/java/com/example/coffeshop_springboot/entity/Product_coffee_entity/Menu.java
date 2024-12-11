package com.example.coffeshop_springboot.entity.Product_coffee_entity;

import com.example.coffeshop_springboot.entity.Chain_coffee_entity.Chain;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "menu")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id")
    private int menuId;

    @ManyToOne
    @JoinColumn(name = "chain_id", nullable = false)
    private Chain chain;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "date_available")
    private LocalDate dateAvailable;
}
