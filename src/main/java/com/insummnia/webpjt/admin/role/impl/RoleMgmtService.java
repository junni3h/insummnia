package com.insummnia.webpjt.admin.role.impl;

import java.util.List;

import com.insummnia.webpjt.admin.role.entity.RoleEntity;
import com.insummnia.webpjt.admin.role.entity.RoleTreeEntity;
import com.insummnia.webpjt.admin.role.entity.RoleUserEntity;
import com.insummnia.webpjt.common.entity.CommonResultEntity;

public interface RoleMgmtService {

    /**
     * 권한 트리 리스트 조회
     * @return
     * @throws Exception
     */
    public List<RoleTreeEntity> findRoleTree() throws Exception;

    /**
     * 권한 아이디별 권한 조회
     * @param params 권한 아이디
     * @return
     * @throws Exception
     */
    public RoleEntity findRoleById(RoleEntity params) throws Exception;
    
    /**
     * 사용자 권한 추가, 수정 및 삭제
     * @param params
     * @return
     * @throws Exception
     */
    public CommonResultEntity updateUserRole(RoleUserEntity params) throws Exception;

    /**
     * 권한 정보 수정
     * @param params 권한 아이디
     * @return 
     * @throws Exception
     */
    public CommonResultEntity updateRoleById(RoleEntity params) throws Exception;
}
