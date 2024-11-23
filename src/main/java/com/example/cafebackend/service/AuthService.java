package com.example.cafebackend.service;
import com.example.cafebackend.entity.User;

import com.example.cafebackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;

    public void register(String name, String email, String password) {
        // Encrypt the password before saving
        String encodedPassword = passwordEncoder.encode(password);
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(encodedPassword);
        userRepository.save(user); // Save user to the database
    }

    public String login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            // Generate JWT token (implementation omitted for brevity)
            return "JWT_TOKEN";
        }
        throw new RuntimeException("Invalid credentials");
    }

    public void sendPasswordResetEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("Email not found");
        }
        String token = generateResetToken(); // Generate a random reset token
        user.setResetToken(token);
        userRepository.save(user);

        // Send email with reset link (implementation omitted)
    }

    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token);
        if (user == null) {
            throw new RuntimeException("Invalid token");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null); // Clear reset token after use
        userRepository.save(user);
    }

    private String generateResetToken() {
        // Generate a random string for reset token (implementation omitted)
        return "RANDOM_TOKEN";
    }
}

