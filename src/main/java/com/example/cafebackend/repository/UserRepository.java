package com.example.cafebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.cafebackend.entity.User;
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email); // Find user by email
    User findByResetToken(String resetToken); // Find user by reset token
}
