package com.rustemsarica.HumanResourceProject.business.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rustemsarica.HumanResourceProject.business.dto.DayOffDto;
import com.rustemsarica.HumanResourceProject.business.services.DayOffService;
import com.rustemsarica.HumanResourceProject.data.entities.DayOffEntity;
import com.rustemsarica.HumanResourceProject.data.repositories.DayOffRepository;

@Service
public class DayOffServiceImpl implements DayOffService {

    @Autowired
    private DayOffRepository dayOffRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ResponseEntity<?> createDayOff(DayOffDto dayOffDto) {
        dayOffRepository.save(dtoToEntity(dayOffDto));
        return ResponseEntity.ok("Day Off created");
    }

    @Override
    public DayOffDto entityToDto(DayOffEntity dayOffEntity) {
        DayOffDto dayOffDto = modelMapper.map(dayOffEntity, DayOffDto.class);
        return dayOffDto;
    }

    @Override
    public DayOffEntity dtoToEntity(DayOffDto dayOffDto) {
        DayOffEntity dayOffEntity = modelMapper.map(dayOffDto, DayOffEntity.class);
        return dayOffEntity;
    }
    
}
