package com.insummnia.webpjt.user.service;

import java.util.List;
import java.util.Map;

import com.insummnia.webpjt.user.entity.UserEntity;

public interface UserService {

    /**
     * 사용자 등록
     * @param params UserEntity
     * @return Map<String, Object> 사용자 존재 여부
     * @throws Exception
     */
    public Map<String, Object> userRegist(UserEntity params) throws Exception;

    /**
     * 사용자 리스트 조회
     * @return List<UserEntity> 사용자 리스트
     * @throws Exception
     */
    public List<UserEntity> userList() throws Exception;
    
}
