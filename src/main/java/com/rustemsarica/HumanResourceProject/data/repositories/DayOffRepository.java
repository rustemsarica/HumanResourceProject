package com.rustemsarica.HumanResourceProject.data.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rustemsarica.HumanResourceProject.data.entities.DayOffEntity;

@Repository
public interface DayOffRepository extends JpaRepository<DayOffEntity,Long>{

    Page<DayOffEntity> findAllByUserId(long userId, Pageable pageable);
    
}
