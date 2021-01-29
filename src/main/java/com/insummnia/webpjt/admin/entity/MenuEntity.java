package com.insummnia.webpjt.admin.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;

import com.insummnia.webpjt.common.entity.CommonEntity;

@Entity
public class MenuEntity extends CommonEntity implements Serializable{

    private static final long serialVersionUID = 1L;

    private String menuId;
    private String menuNm;
    private String menuUrl;
    private String menuUpperId;

    private String menuIcon;
    private String menuOrd;
    private String menuDepth;

    private String hasParent;
    private MenuEntity child;
    private List<MenuEntity> children = new ArrayList<MenuEntity>();

    public String getMenuId() {
        return menuId;
    }

    public void setMenuId(String menuId) {
        this.menuId = menuId;
    }

    public String getMenuNm() {
        return menuNm;
    }

    public void setMenuNm(String menuNm) {
        this.menuNm = menuNm;
    }

    public String getMenuUrl() {
        return menuUrl;
    }

    public void setMenuUrl(String menuUrl) {
        this.menuUrl = menuUrl;
    }

    public String getMenuUpperId() {
        return menuUpperId;
    }

    public void setMenuUpperId(String menuUpperId) {
        this.menuUpperId = menuUpperId;
    }

    public String getMenuIcon() {
        return menuIcon;
    }

    public void setMenuIcon(String menuIcon) {
        this.menuIcon = menuIcon;
    }

    public String getMenuOrd() {
        return menuOrd;
    }

    public void setMenuOrd(String menuOrd) {
        this.menuOrd = menuOrd;
    }

    public String getMenuDepth() {
        return menuDepth;
    }

    public void setMenuDepth(String menuDepth) {
        this.menuDepth = menuDepth;
    }

    public String getHasParent() {
        return hasParent;
    }

    public void setHasParent(String hasParent) {
        this.hasParent = hasParent;
    }

    public MenuEntity getChild() {
        return child;
    }

    public void setChild(MenuEntity child) {
        this.child = child;
    }

    public List<MenuEntity> getChildren() {
        return children;
    }

    public void setChildren(List<MenuEntity> children) {
        this.children = children;
    }

    @Override
    public String toString() {
        return "MenuEntity [children=" + children + ",hasParent=" + hasParent + ", menuDepth=" + menuDepth + 
        ", menuIcon=" + menuIcon + ", menuId=" + menuId + ", menuNm=" + menuNm + ", menuOrd=" + menuOrd + 
        ", menuUpperId=" + menuUpperId + ", menuUrl=" + menuUrl + "]";
    }

}
