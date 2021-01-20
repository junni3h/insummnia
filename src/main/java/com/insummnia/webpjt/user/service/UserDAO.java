package com.insummnia.webpjt.user.service;

import java.util.List;

import com.insummnia.webpjt.user.entity.UserMSTEntity;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDAO {
    
    @Autowired
    private SqlSession sqlSession;

    /**
     * 사용자 가입
     * @param params 사용자 마스터
     * @throws Exception
     **/
    public void userRegist(UserMSTEntity params) throws Exception {
        sqlSession.insert("registUserMST", params);
        sqlSession.insert("registUserInfo", params);
    }

    /**
     * 사용자 정보 수정
     * @param params 사용자 마스터
     * @throws Exception
     **/
    public void userUpdate(UserMSTEntity params) throws Exception {
        sqlSession.update("updateUserMST", params);
    }

    /**
     * 사용자 가입확인
     * @param userId 사용자 아이디
     * @return
     * @throws Exception
     **/
    public Boolean userCheck(String userId) throws Exception {
        return sqlSession.selectOne("selectUserCheck", userId);
    }

    /**
     * 사용자 목록 조회
     * @return
     * @throws Exception
     **/
    public List<UserMSTEntity> userList() throws Exception {
        return sqlSession.selectList("selectUserList");
    }

    /**
     * 사용자 정보 조회
     * @param userId 사용자 아이디
     * @return
     * @throws Exception
     **/
    public List<UserMSTEntity> userInfo(String userId) throws Exception {
        return sqlSession.selectList("selectUserInfo", userId);
    }

}
