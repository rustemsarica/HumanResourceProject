package com.rustemsarica.HumanResourceProject.business.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DayOffDto {

    private Long userId;
    private int dayOffCount;
    private Date startDate;
    
}
