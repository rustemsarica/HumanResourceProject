package com.rustemsarica.HumanResourceProject.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rustemsarica.HumanResourceProject.business.dto.UserDto;
import com.rustemsarica.HumanResourceProject.business.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    UserService userServices;

    @GetMapping
    public List<UserDto> users(){
        return userServices.getAllUsers();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long userId){
        return userServices.getUserById(userId);
    }
}
