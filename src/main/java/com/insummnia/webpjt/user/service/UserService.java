package com.insummnia.webpjt.user.service;

import java.util.List;

import com.insummnia.webpjt.user.entity.UserEntity;

public interface UserService {

    public List<UserEntity> userRegist(UserEntity params) throws Exception;
    
}
