package com.rustemsarica.HumanResourceProject.business.dto;

// import java.util.List;

// import com.rustemsarica.HumanResourceProject.data.entities.AccountTransactionEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {
   
    private Long id;
    
    private String name;

    private String username;

    private float balance;

    // private List<AccountTransactionEntity> accountTransactionEntities;

}
