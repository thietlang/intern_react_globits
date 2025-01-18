package com.globits.hr.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.globits.hr.domain.SalaryConfigItem;
import com.globits.hr.dto.SalaryConfigItemDto;

@Repository
public interface SalaryConfigItemRepository extends JpaRepository<SalaryConfigItem, UUID> {
    @Query("select new com.globits.hr.dto.SalaryConfigItemDto(s) from SalaryConfigItem s where s.salaryConfig.id = ?1 order by s.itemOrder")
    Page<SalaryConfigItemDto> getPageBySalaryConfigId(UUID salaryConfigId, Pageable pageable);
}