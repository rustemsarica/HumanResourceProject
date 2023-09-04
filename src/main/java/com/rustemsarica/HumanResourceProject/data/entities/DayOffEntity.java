package com.rustemsarica.HumanResourceProject.data.entities;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

@Entity
public class DayOffEntity extends BaseEntity{
    
    @ManyToOne
    private UserEntity user;

    private int dayOffsCount;

    private Date startDate;

    private Date endDate;

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public int getDayOffsCount() {
        return dayOffsCount;
    }

    public void setDayOffsCount(int dayOffsCount) {
        this.dayOffsCount = dayOffsCount;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
    
}
