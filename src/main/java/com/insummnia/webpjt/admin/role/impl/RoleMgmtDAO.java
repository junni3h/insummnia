package com.insummnia.webpjt.admin.role.impl;

import java.util.List;

import com.insummnia.webpjt.admin.role.entity.RoleEntity;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RoleMgmtDAO {

    @Autowired
    private SqlSession sqlSession;

    public List<RoleEntity> findRoleList() throws Exception {
        return sqlSession.selectList("findRoleList");
    }
    
}
