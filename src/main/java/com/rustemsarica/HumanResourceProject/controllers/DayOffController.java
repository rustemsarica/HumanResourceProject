package com.rustemsarica.HumanResourceProject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rustemsarica.HumanResourceProject.business.dto.DayOffDto;
import com.rustemsarica.HumanResourceProject.business.services.DayOffService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/day-offs")
@Validated
public class DayOffController {

    @Autowired
    DayOffService dayOffService;
    
    public ResponseEntity<?> createDayOff(@RequestBody @Valid DayOffDto dayOffDto){
        return dayOffService.createDayOff(dayOffDto);
    }
}
