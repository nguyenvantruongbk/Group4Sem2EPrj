package com.example.coffeshop_springboot.controller;

import com.example.coffeshop_springboot.entity.User;
import com.example.coffeshop_springboot.service.User_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user_data")
public class UserController {

    @Autowired
    private User_Service userService;


    @PostMapping("/get_user")
    public ResponseEntity<?> get_User(@RequestBody Map<String,Long> request ){
        try {
            Long userId = request.get("userId");

            if (userId == null) {
                return new ResponseEntity<>("Missing userId", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(userService.get_User(userId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();  // Log the exception for debugging purposes
            return new ResponseEntity<>("ID Ko Hợp Lệ", HttpStatus.BAD_REQUEST);
        }


    }

    @PutMapping("/update_user/{id}")
    public  ResponseEntity<?> update_User(@PathVariable Long id, @RequestBody User user){
        try {
            User update_user = userService.Update_User(id,user);
            return new ResponseEntity<>(update_user,HttpStatus.OK);
        } catch (Exception e) {
            return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
