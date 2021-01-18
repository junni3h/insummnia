package com.insummnia.webpjt.user.entity;

import java.io.Serializable;

import javax.persistence.Entity;

import com.insummnia.webpjt.common.entity.CommonEntity;

@Entity
public class UserEntity extends CommonEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    
    private String userId;
    private String password;
    private String userNm;
    private String nickNm;

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserNm() {
        return this.userNm;
    }

    public void setUserNm(String userNm) {
        this.userNm = userNm;
    }

    public String getNickNm() {
        return this.nickNm;
    }

    public void setNickNm(String nickNm) {
        this.nickNm = nickNm;
    };

}
