package com.rustemsarica.HumanResourceProject.business.services;

import org.springframework.http.ResponseEntity;

import com.rustemsarica.HumanResourceProject.business.dto.DayOffDto;
import com.rustemsarica.HumanResourceProject.data.entities.DayOffEntity;

public interface DayOffService {
    public ResponseEntity<?> createDayOff(DayOffDto dayOffDto);

    //model mapper
    public DayOffDto entityToDto(DayOffEntity dayOffEntity);
    public DayOffEntity dtoToEntity(DayOffDto dayOffDto);
}
