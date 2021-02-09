package com.insummnia.webpjt.admin.role.entity;

import java.io.Serializable;

import javax.persistence.Entity;

@Entity
public class RoleTreeEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String label;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    @Override
    public String toString() {
        return "RoleTreeEntity [id=" + id + ", label=" + label + "]";
    }

}
