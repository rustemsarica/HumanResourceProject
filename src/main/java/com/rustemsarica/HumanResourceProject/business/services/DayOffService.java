package com.rustemsarica.HumanResourceProject.business.services;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import com.rustemsarica.HumanResourceProject.business.dto.DayOffDto;
import com.rustemsarica.HumanResourceProject.data.entities.DayOffEntity;

public interface DayOffService {
    public ResponseEntity<?> createDayOff(DayOffDto dayOffDto) throws Exception;

    //model mapper
    public DayOffDto entityToDto(DayOffEntity dayOffEntity);
    public DayOffEntity dtoToEntity(DayOffDto dayOffDto) throws Exception;

    public Page<DayOffEntity> getAllDayOffs(Pageable pageable);

    public Page<DayOffEntity> getUserDayOffs(Pageable pageable, long userId);
}
