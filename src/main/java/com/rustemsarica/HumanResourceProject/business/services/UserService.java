package com.rustemsarica.HumanResourceProject.business.services;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.rustemsarica.HumanResourceProject.business.dto.UserDto;
import com.rustemsarica.HumanResourceProject.data.entities.UserEntity;

public interface UserService {
    
    public List<UserDto> getAllUsers();
    public UserDto createUser(UserDto userDto);
    public UserEntity getUserByUsername(String username);
    public ResponseEntity<UserDto> getUserById(Long id);
    public ResponseEntity<UserDto> updateUser(Long id, UserDto userDto);
    public ResponseEntity<Map<String,Boolean>> deleteUser(Long id);

    public void saveUser(UserEntity userEntity);

    //model mapper
    public UserDto entityToDto(UserEntity user);
    public UserEntity dtoToEntity(UserDto userDto);
}
