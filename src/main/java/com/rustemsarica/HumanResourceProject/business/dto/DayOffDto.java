package com.rustemsarica.HumanResourceProject.business.dto;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DayOffDto {

    @Min(value = 1)
    private Long userId;
    @Min(value = 1)
    private int dayOffCount;
    @Pattern(regexp = "^(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$")
    private String date;
    
}
