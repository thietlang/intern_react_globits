package com.globits.hr.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import com.globits.core.domain.BaseObject;

/**
 * @author dunghq Ngành/Chuyên ngành đào tạo
 */
@Entity
@Table(name = "tbl_hr_speciality")
@XmlRootElement
public class HrSpeciality extends BaseObject {
    private static final long serialVersionUID = -8572338478825985432L;
    private String name;
    private String code;
    @Column(name = "name_eng")
    private String nameEng;//tên tiếng anh
    @Column(name = "numberic_code")//Mã qui ước để đánh mã số sinh viên
    private String numbericCode;

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

    public String getNumbericCode() {
        return numbericCode;
    }

    public void setNumbericCode(String numbericCode) {
        this.numbericCode = numbericCode;
    }

    public String getNameEng() {
        return nameEng;
    }

    public void setNameEng(String nameEng) {
        this.nameEng = nameEng;
    }

    public HrSpeciality() {

    }
}
