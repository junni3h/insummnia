package com.insummnia.webpjt.admin.role.entity;

import java.io.Serializable;

import javax.persistence.Entity;

import com.insummnia.webpjt.common.entity.CommonEntity;

@Entity
public class RoleEntity extends CommonEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    private String roleId;
    private String roleNm;
    private String roleNmKr;
    private String roleNmEn;

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getRoleNm() {
        return roleNm;
    }

    public void setRoleNm(String roleNm) {
        this.roleNm = roleNm;
    }

    public String getRoleNmKr() {
        return roleNmKr;
    }

    public void setRoleNmKr(String roleNmKr) {
        this.roleNmKr = roleNmKr;
    }

    public String getRoleNmEn() {
        return roleNmEn;
    }

    public void setRoleNmEn(String roleNmEn) {
        this.roleNmEn = roleNmEn;
    }

    @Override
    public String toString() {
        return "RoleEntity [roleId=" + roleId + ", roleNm=" + roleNm + ", roleNmEn=" + roleNmEn + ", roleNmKr="
                + roleNmKr + "]";
    }

}
