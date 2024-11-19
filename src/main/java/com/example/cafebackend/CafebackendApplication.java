package com.example.cafebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class CafebackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CafebackendApplication.class, args);
	}

}


