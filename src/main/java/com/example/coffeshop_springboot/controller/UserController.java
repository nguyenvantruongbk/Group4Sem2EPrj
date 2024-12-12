package com.example.coffeshop_springboot.controller;

import com.example.coffeshop_springboot.entity.User;
import com.example.coffeshop_springboot.entity.UserAuth;
import com.example.coffeshop_springboot.repository.UserAuth_Repository;
import com.example.coffeshop_springboot.service.User_Service;
import com.example.coffeshop_springboot.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user_data")
public class UserController {

    @Autowired
    private User_Service userService;

    @Autowired
    private UserAuth_Repository userAuthRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/get_user")
    public ResponseEntity<?> get_User(@RequestHeader("Authorization") String token ){
        try {
            String jwtToken = token.replace("Bearer ", "");

            UserAuth userAuth_token = jwtUtil.extractUserAuth(jwtToken);
            Optional<UserAuth> userAuth = userAuthRepository.findByAuth_id(userAuth_token.getAuth_id());
            if (!userAuth.isPresent()){
                return new ResponseEntity<>("Tài Khoản Ko Tồn Tại", HttpStatus.BAD_REQUEST);
            }
            if (userAuth_token == null) {
                return new ResponseEntity<>("Missing userId", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(userService.get_User(userAuth.get().getUser().getUserId()), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();  // Log the exception for debugging purposes
            return new ResponseEntity<>("ID Ko Hợp Lệ", HttpStatus.BAD_REQUEST);
        }

    }


    @PutMapping("/update_user")
    public  ResponseEntity<?> update_User( @RequestBody User user,@RequestHeader("Authorization") String token){

        try {

            String jwtToken = token.replace("Bearer ", "");
            UserAuth userAuth_token = jwtUtil.extractUserAuth(jwtToken);
            Optional<UserAuth> userAuth = userAuthRepository.findByAuth_id(userAuth_token.getAuth_id());
            if (!userAuth.isPresent()){
                return new ResponseEntity<>("Tài Khoản Ko Tồn Tại", HttpStatus.BAD_REQUEST);
            }

            User update_user = userService.Update_User(userAuth.get().getUser().getUserId(), user);
            return new ResponseEntity<>(update_user,HttpStatus.OK);
        } catch (Exception e) {
            return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
