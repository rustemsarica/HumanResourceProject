package com.rustemsarica.HumanResourceProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rustemsarica.HumanResourceProject.business.dto.DayOffDto;
import com.rustemsarica.HumanResourceProject.business.services.DayOffService;
import com.rustemsarica.HumanResourceProject.business.services.UserService;
import com.rustemsarica.HumanResourceProject.data.entities.DayOffEntity;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/day-offs")
@Validated
public class DayOffController {

    @Autowired
    DayOffService dayOffService;

    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<?> getDayOffs(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Pageable pageable = PageRequest.of(page, size);
        Page<DayOffEntity> response = null;
        if(auth!=null){
            if(auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))){
                response = dayOffService.getAllDayOffs(pageable);
            }else{
                response = dayOffService.getUserDayOffs(pageable, userService.getUserByUsername(auth.getName()).getId());
            }
        }
        return ResponseEntity.ok(response);
    }
    
    @PostMapping
    public ResponseEntity<?> createDayOff(@RequestBody @Valid DayOffDto dayOffDto) throws Exception{
        return dayOffService.createDayOff(dayOffDto);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserDayOffs(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @PathVariable Long userId){
        
        Pageable pageable = PageRequest.of(page, size);
        Page<DayOffEntity> response = dayOffService.getUserDayOffs(pageable, userId);          
        return ResponseEntity.ok(response);
    }
}
