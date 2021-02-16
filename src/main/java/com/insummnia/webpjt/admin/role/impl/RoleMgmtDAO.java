package com.insummnia.webpjt.admin.role.impl;

import java.util.List;

import com.insummnia.webpjt.admin.role.entity.RoleEntity;
import com.insummnia.webpjt.admin.role.entity.RoleTreeEntity;
import com.insummnia.webpjt.user.entity.UserMSTEntity;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RoleMgmtDAO {

    @Autowired
    private SqlSession sqlSession;

    /**
     * 권한 트리 리스트 조회
     * @return
     * @throws Exception
     */
    public List<RoleTreeEntity> findRoleTree() throws Exception {
        return sqlSession.selectList("findRoleTree");
    }

    /**
     * 권한 아이디별 권한 조회
     * @param params 권한 아이디
     * @return
     * @throws Exception
     */
    public RoleEntity findRolebyId(RoleEntity params) throws Exception {
        return sqlSession.selectOne("findRoleById", params);
    }

    /**
     * 권한 정보 수정
     * @param params 권한 아이디
     * @throws Exception
     */
    public void updateRoleById(RoleEntity params) throws Exception{
        sqlSession.update("updateRoleById", params);
    }

    /**
     * 사용자 권한 생성 및 추가
     * @param params
     * @throws Exception
     */
    public void insertUserRole(UserMSTEntity params) throws Exception {
        sqlSession.insert("insertUserRole", params);
    }

    /**
     * 사용자 권한 삭제
     * @param params
     * @throws Exception
     */
    public void removeUserRole(UserMSTEntity params) throws Exception {
        sqlSession.delete("removeUserRole", params);
    }
    
}
