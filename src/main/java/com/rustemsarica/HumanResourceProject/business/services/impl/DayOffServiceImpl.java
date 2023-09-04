package com.rustemsarica.HumanResourceProject.business.services.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rustemsarica.HumanResourceProject.business.dto.DayOffDto;
import com.rustemsarica.HumanResourceProject.business.services.DayOffService;
import com.rustemsarica.HumanResourceProject.business.services.UserService;
import com.rustemsarica.HumanResourceProject.data.entities.DayOffEntity;
import com.rustemsarica.HumanResourceProject.data.repositories.DayOffRepository;

@Service
public class DayOffServiceImpl implements DayOffService {

    @Autowired
    private DayOffRepository dayOffRepository;

    @Autowired
    private UserService userService; 
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ResponseEntity<?> createDayOff(DayOffDto dayOffDto) throws Exception {
        dayOffRepository.save(dtoToEntity(dayOffDto));
        return ResponseEntity.ok("Day Off created");
    }

    @Override
    public DayOffDto entityToDto(DayOffEntity dayOffEntity) {
        DayOffDto dayOffDto = modelMapper.map(dayOffEntity, DayOffDto.class);
        return dayOffDto;
    }

    @Override
    public DayOffEntity dtoToEntity(DayOffDto dayOffDto) throws Exception {
        DayOffEntity dayOffEntity = new DayOffEntity();
        dayOffEntity.setDayOffsCount(dayOffDto.getDayOffCount());
        dayOffEntity.setUser(userService.dtoToEntity(userService.getUserById(dayOffDto.getUserId()).getBody()));
        
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = dateFormat.parse(dayOffDto.getDate());
        dayOffEntity.setStartDate(startDate);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDate);

        calendar.add(Calendar.DAY_OF_MONTH, dayOffDto.getDayOffCount());
        Date futureDate = calendar.getTime();

        dayOffEntity.setEndDate(futureDate);
        return dayOffEntity;
    }

    @Override
    public Page<DayOffEntity> getAllDayOffs(Pageable pageable) {
        return dayOffRepository.findAll(pageable);
    }

    @Override
    public Page<DayOffEntity> getUserDayOffs(Pageable pageable, long userId) {
        return dayOffRepository.findAllByUserId(userId,pageable);
    }
    
}
