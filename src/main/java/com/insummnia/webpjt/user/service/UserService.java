package com.insummnia.webpjt.user.service;

import java.util.List;
import java.util.Map;

import com.insummnia.webpjt.user.entity.UserMSTEntity;

public interface UserService {

    /**
     * 사용자 등록
     * @param params 사용자 마스터
     * @return Map<String, Object> 사용자 존재 여부
     * @throws Exception
     */
    public Map<String, Object> userRegist(UserMSTEntity params) throws Exception;

    /**
     * 사용자 정보 수정
     * @param params 사용자 마스터
     * @return Map<String, Objecty> 사용자 수정 성공 여부
     * @throws Exception
     */
    public Map<String, Object> userUpdate(UserMSTEntity params) throws Exception;
    
    /**
     * 사용자 리스트 조회
     * @return List<UserEntity> 사용자 리스트
     * @throws Exception
     */
    public List<UserMSTEntity> userList() throws Exception;

    /**
     * 사용자 데이터 조회
     * @param userId 사용자 아이디
     * @return UserEntity 사용자 리스트
     * @throws Exception
     */
    public UserMSTEntity userInfo(String userId) throws Exception;
    
}
