package com.rustemsarica.HumanResourceProject.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rustemsarica.HumanResourceProject.business.dto.UserDto;
import com.rustemsarica.HumanResourceProject.business.services.UserService;
import com.rustemsarica.HumanResourceProject.data.entities.UserEntity;

@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    UserService userServices;

    @GetMapping
    public ResponseEntity<?> users(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<UserEntity> response = userServices.getAllUsersPaginate(pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long userId){
        return userServices.getUserById(userId);
    }
}
