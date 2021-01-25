package com.insummnia.webpjt.user.entity;

import java.io.Serializable;

import javax.persistence.Entity;

import com.insummnia.webpjt.common.entity.CommonEntity;

@Entity
public class UserMSTEntity extends CommonEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    
    // 사용자 기본정보
    private String userId;   // 사용자 아이디
    private String password; // 패스워드
    private String userNm;   // 사용자 이름
    private String nickNm;   // 사용자 별명

    // 사용자 부가정보(권한)
    private String roleId;   // 사용자 권한 아이디
    private String roleNm;   // 사용자 권한 이름

    // 사용자 부가정보()
    private String isUserEnabled; // 사용자 사용 여부
    private String isUserLocked;  // 사용자 잠김 여부
    private String isUserExpired; // 사용자 만료 여부
    private String isUserDeleted; // 사용자 삭제 여부

    // 사용자 부가정보 (로그인)
    private String recentLoginDatetime; // 사용자 최근 로그인 시간
    private String lastLogoutDatetime;  // 시용자 마지막 로그아웃 시간 

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserNm() {
        return userNm;
    }

    public void setUserNm(String userNm) {
        this.userNm = userNm;
    }

    public String getNickNm() {
        return nickNm;
    }

    public void setNickNm(String nickNm) {
        this.nickNm = nickNm;
    }

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

    public String getIsUserEnabled() {
        return isUserEnabled;
    }

    public void setIsUserEnabled(String isUserEnabled) {
        this.isUserEnabled = isUserEnabled;
    }

    public String getIsUserLocked() {
        return isUserLocked;
    }

    public void setIsUserLocked(String isUserLocked) {
        this.isUserLocked = isUserLocked;
    }

    public String getIsUserExpired() {
        return isUserExpired;
    }

    public void setIsUserExpired(String isUserExpired) {
        this.isUserExpired = isUserExpired;
    }

    public String getIsUserDeleted() {
        return isUserDeleted;
    }

    public void setIsUserDeleted(String isUserDeleted) {
        this.isUserDeleted = isUserDeleted;
    }

    public String getRecentLoginDatetime() {
        return recentLoginDatetime;
    }

    public void setRecentLoginDatetime(String recentLoginDatetime) {
        this.recentLoginDatetime = recentLoginDatetime;
    }

    public String getLastLogoutDatetime() {
        return lastLogoutDatetime;
    }

    public void setLastLogoutDatetime(String lastLogoutDatetime) {
        this.lastLogoutDatetime = lastLogoutDatetime;
    }

    @Override
    public String toString() {
        return "UserMSTEntity [isUserDeleted=" + isUserDeleted + ", isUserEnabled=" + isUserEnabled + ", isUserExpired="
                + isUserExpired + ", isUserLocked=" + isUserLocked + ", lastLogoutDatetime=" + lastLogoutDatetime
                + ", nickNm=" + nickNm + ", password=" + password + ", recentLoginDatetime=" + recentLoginDatetime
                + ", roleId=" + roleId + ", roleNm=" + roleNm + ", userId=" + userId + ", userNm=" + userNm + "]";
    }

}
