package com.insummnia.webpjt.admin.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;

@Entity
public class MenuTreeEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String label;
    private String upperId;
    private MenuTreeEntity child;
    private List<MenuTreeEntity> children = new ArrayList<MenuTreeEntity>();

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

    public String getUpperId() {
        return upperId;
    }

    public void setUpperId(String upperId) {
        this.upperId = upperId;
    }

    public MenuTreeEntity getChild() {
        return child;
    }

    public void setChild(MenuTreeEntity child) {
        this.child = child;
    }

    public List<MenuTreeEntity> getChildren() {
        return children;
    }

    public void setChildren(List<MenuTreeEntity> children) {
        this.children = children;
    }

    @Override
    public String toString() {
        return "MenuTreeEntity [child=" + child + ", children=" + children + ", id=" + id + ", label=" + label
                + ", upperId=" + upperId + "]";
    }

}
