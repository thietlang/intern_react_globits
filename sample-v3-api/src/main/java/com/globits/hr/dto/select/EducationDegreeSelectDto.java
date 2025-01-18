package com.globits.hr.dto.select;

import java.util.UUID;

import com.globits.core.domain.Country;
import com.globits.hr.domain.EducationDegree;

public class EducationDegreeSelectDto {
    private UUID id;

    private String name;

    private String code;

    public EducationDegreeSelectDto() {
    }

    public EducationDegreeSelectDto(EducationDegree entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.code = entity.getCode();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

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
}
