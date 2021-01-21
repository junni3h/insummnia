package com.insummnia.webpjt.auth.authentication.impl;

import java.util.Map;

import com.insummnia.webpjt.user.entity.UserMSTEntity;

public interface LoginService {
    
    public Map<String, Object> login(UserMSTEntity user) throws Exception;

}
