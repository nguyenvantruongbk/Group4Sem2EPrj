package com.example.cafebackend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class SecurityConfig {

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		// Define the BCryptPasswordEncoder as a Spring Bean
		return new BCryptPasswordEncoder();
	}
}
