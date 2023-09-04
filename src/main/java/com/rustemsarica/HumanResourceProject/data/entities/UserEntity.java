package com.rustemsarica.HumanResourceProject.data.entities;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rustemsarica.HumanResourceProject.data.entities.utils.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class UserEntity extends BaseEntity{
    
    private UserRole role = UserRole.ROLE_USER;

    private String name;

    @Column(unique = true)
    private String username;

    @JsonIgnore
    private String password;

    @JsonIgnore
    private int failedLoginAttempts = 0;

    @JsonIgnore
    private boolean accountNonLocked = true;

    @Min(value = 0)
    private float salary=0;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<DayOffEntity> dayOffs;

    public List<DayOffEntity> getDayOffs() {
        return dayOffs;
    }

    public void setDayOffs(List<DayOffEntity> dayOffs) {
        this.dayOffs = dayOffs;
    }

    public float getSalary() {
        return salary;
    }

    public void setSalary(float salary) {
        this.salary = salary;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getFailedLoginAttempts() {
        return failedLoginAttempts;
    }

    public void setFailedLoginAttempts(int failedAttempts) {
        this.failedLoginAttempts = failedAttempts;
        
    }

    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        this.accountNonLocked = accountNonLocked;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole userRole) {
        this.role = userRole;
    }
    
}
