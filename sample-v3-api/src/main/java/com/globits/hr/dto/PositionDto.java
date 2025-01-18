package com.globits.hr.dto;

import com.globits.hr.domain.Position;

public class PositionDto extends BaseObjectDto{

	private static final long serialVersionUID = 1L;
	private String name;
	private String description;
	private int status;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	
	public PositionDto(){
		
	}
	public PositionDto(Position p){
		this.id = p.getId();
		this.description=p.getDescription();
		this.name=p.getName();
		this.status=p.getStatus();
	}
}
