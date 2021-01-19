package com.insummnia.webpjt.user.service;

import java.util.List;

import com.insummnia.webpjt.user.entity.UserEntity;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDAO {
    
    @Autowired
    private SqlSession sqlSession;

    public List<UserEntity> userInfo(String params) throws Exception {
        return sqlSession.selectList("userInfo", params);
    }

    public void userRegist(UserEntity params) throws Exception {
        sqlSession.insert("registUserMst", params);
        sqlSession.insert("registUserInfo", params);
    }

    public List<UserEntity> userList() throws Exception {
        return sqlSession.selectList("selectUserList");
    }

}
