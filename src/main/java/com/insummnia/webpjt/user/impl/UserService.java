package com.insummnia.webpjt.user.impl;

import java.util.List;
import java.util.Map;

import com.insummnia.webpjt.admin.role.entity.RoleEntity;
import com.insummnia.webpjt.user.entity.UserMSTEntity;

public interface UserService {

    /**
     * 사용자 등록
     * @param params 사용자 마스터
     * @return Map<String, Object> 사용자 등록 성공 여부
     * @throws Exception
     **/
    public Map<String, Object> userRegist(UserMSTEntity params) throws Exception;

    /**
     * 사용자 정보 수정
     * @param params 사용자 마스터
     * @return Map<String, Objecty> 사용자 수정 성공 여부
     * @throws Exception
     **/
    public Map<String, Object> userUpdate(UserMSTEntity params) throws Exception;
    
    /**
     * 사용자 리스트 조회
     * @return List<UserEntity> 사용자 리스트
     * @throws Exception
     **/
    public List<UserMSTEntity> userList() throws Exception;

    /**
     * 사용자 조회
     * @param userId 사용자 아이디
     * @return UserEntity 사용자 리스트
     * @throws Exception
     **/
    public UserMSTEntity userInfo(String userId) throws Exception;

    /**
     * 사용자 아이디 중복체크
     * @param params 사용자 아이디
     * @return
     * @throws Exception
     */
    public Boolean findUserDuplicationById(UserMSTEntity params) throws Exception;

    /**
     * 권한별 사용자 조회
     * @param params 권한 아이디
     * @return
     * @throws Exception
     */
    public List<UserMSTEntity> findUserByRoleId(RoleEntity params) throws Exception;

    /**
     * 권한별 제외 사용자 조회
     * @param params 권한 아이디
     * @return
     * @throws Exception
     */
    public List<UserMSTEntity> findExceptUserByRoleId(RoleEntity params) throws Exception;
    
}
