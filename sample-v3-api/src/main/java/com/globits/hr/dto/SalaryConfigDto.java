package com.globits.hr.dto;

import java.util.ArrayList;
import java.util.List;

import com.globits.core.dto.DepartmentDto;
import com.globits.hr.domain.SalaryConfig;
import com.globits.hr.domain.SalaryConfigItem;

public class SalaryConfigDto extends BaseObjectDto {

    private static final long serialVersionUID = 1L;
    private String name;
    private String code;
    private DepartmentDto department;

    private List<SalaryConfigItemDto> salaryConfigItems;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public DepartmentDto getDepartment() {
        return department;
    }

    public void setDepartment(DepartmentDto department) {
        this.department = department;
    }

    public List<SalaryConfigItemDto> getSalaryConfigItems() {
        return salaryConfigItems;
    }

    public void setSalaryConfigItems(List<SalaryConfigItemDto> salaryConfigItems) {
        this.salaryConfigItems = salaryConfigItems;
    }

    public SalaryConfigDto() {

    }

    public SalaryConfigDto(SalaryConfig s) {
        if (s != null) {
            this.setId(s.getId());
            this.setCode(s.getCode());
            this.setName(s.getName());
            if (s.getDepartment() != null) {
                this.department = new DepartmentDto(s.getDepartment());
            }
            if (s.getSalaryConfigItems() != null && s.getSalaryConfigItems().size() > 0) {
                this.salaryConfigItems = new ArrayList<SalaryConfigItemDto>();
                for (SalaryConfigItem si : s.getSalaryConfigItems()) {
                    SalaryConfigItemDto siDto = new SalaryConfigItemDto();
                    if (si.getSalaryConfig() != null) {
                        SalaryConfig salaryConfig = si.getSalaryConfig();
                        SalaryConfigDto salaryConfigDto = new SalaryConfigDto();
                        salaryConfigDto.setCode(si.getSalaryConfig().getCode());
                        salaryConfigDto.setName(si.getSalaryConfig().getName());
                        if (salaryConfig.getDepartment() != null) {
                            DepartmentDto depDto = new DepartmentDto();
                            depDto.setCode(salaryConfig.getCode());
                            depDto.setDepartmentType(salaryConfig.getDepartment().getDepartmentType());
                            depDto.setId(salaryConfig.getDepartment().getId());
                            depDto.setName(salaryConfig.getDepartment().getName());
                        }
                        siDto.setSalaryConfig(salaryConfigDto);
                    }
                    siDto.setId(si.getId());
                    if (si.getSalaryItem() != null) {

                        SalaryItemDto salaryItemDto = new SalaryItemDto();
                        salaryItemDto.setCode(si.getSalaryItem().getCode());
                        salaryItemDto.setName(si.getSalaryItem().getName());
                        salaryItemDto.setType(si.getSalaryItem().getType());
                        salaryItemDto.setFormula(si.getSalaryItem().getFormula());
                        salaryItemDto.setIsDefault(si.getSalaryItem().getIsDefault());
                        salaryItemDto.setIsActive(si.getSalaryItem().getIsActive());
                        salaryItemDto.setDefaultValue(si.getSalaryItem().getDefaultValue());
                        siDto.setSalaryItem(salaryItemDto);
                    }
                    this.salaryConfigItems.add(siDto);
                }
            }
        }
    }
}
