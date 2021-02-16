package com.insummnia.webpjt.admin.role.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;

import com.insummnia.webpjt.user.entity.UserMSTEntity;

@Entity
public class RoleUserEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    private List<UserMSTEntity> roleUsers = new ArrayList<UserMSTEntity>();
    private List<UserMSTEntity> expectUsers = new ArrayList<UserMSTEntity>();

    @Override
    public String toString() {
        return "RoleUserEntity [expectUsers=" + expectUsers + ", roleUsers=" + roleUsers + "]";
    }

    public List<UserMSTEntity> getRoleUsers() {
        return roleUsers;
    }

    public void setRoleUsers(List<UserMSTEntity> roleUsers) {
        this.roleUsers = roleUsers;
    }

    public List<UserMSTEntity> getExpectUsers() {
        return expectUsers;
    }

    public void setExpectUsers(List<UserMSTEntity> expectUsers) {
        this.expectUsers = expectUsers;
    }

}
