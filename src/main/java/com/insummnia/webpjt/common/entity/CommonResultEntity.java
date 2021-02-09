package com.insummnia.webpjt.common.entity;

import java.io.Serializable;

import javax.persistence.Entity;

@Entity
public class CommonResultEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    private Boolean success;
    private String message;

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "CommonResultEntity [message=" + message + ", success=" + success + "]";
    }

}
