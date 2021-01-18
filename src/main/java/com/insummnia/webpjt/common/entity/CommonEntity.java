package com.insummnia.webpjt.common.entity;

import java.io.Serializable;

import javax.persistence.Entity;

@Entity
public class CommonEntity implements Serializable{

    private static final long serialVersionUID = 1L;
    
    private String createUserId = "isMania";
    private String createDatetime;
    private String updateUserId;
    private String updateDatetime;

    public String getCreateUserId() {
        return this.createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

    public String getCreateDatetime() {
        return this.createDatetime;
    }

    public void setCreateDatetime(String createDatetime) {
        this.createDatetime = createDatetime;
    }

    public String getUpdateUserId() {
        return this.updateUserId;
    }

    public void setUpdateUserId(String updateUserId) {
        this.updateUserId = updateUserId;
    }

    public String getUpdateDatetime() {
        return this.updateDatetime;
    }

    public void setUpdateDatetime(String updateDatetime) {
        this.updateDatetime = updateDatetime;
    };

}
