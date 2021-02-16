package com.insummnia.webpjt.user.impl;

import java.util.List;

import com.insummnia.webpjt.admin.role.entity.RoleEntity;
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
        // 사용자 마스터 정보 등록
        sqlSession.insert("registUserMST", params);
        // 사용자 추가 정보 등록
        sqlSession.insert("registUserInfo", params);
        // 사용자 권한 등록
        sqlSession.insert("registUserAuth", params);
        // 사용자 인증 등록
        sqlSession.insert("registUserRole", params);
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
     * 사용자 가입확인 (회원가입 후처리)
     * @param userId 사용자 아이디
     * @return
     * @throws Exception
     **/
    public Boolean userCheck(String userId) throws Exception {
        return sqlSession.selectOne("selectUserCheck", userId);
    }

    /**
     * 사용자 가입확인 (로그인)
     * @param params 사용자 마스터
     * @return
     * @throws Exception
     **/
    public Boolean loginCheck(UserMSTEntity user) throws Exception {
        return sqlSession.selectOne("selectLoginCheck", user);
    }

    /**
     * 사용자 로그인 정보 업데이트 (로그인 성공시)
     * @param userId
     * @throws Exception
     */
    public void loginUpdate(String userId) throws Exception {
        sqlSession.update("updateLoginUserInfo", userId);
    }

    /**
     * 사용자 로그인 정보 업데이트 (로그아웃 성공시)
     * @param userId
     * @throws Exception
     */
    public void logOutUpdate(String userId) throws Exception {
        sqlSession.update("updateLogOutUserInfo", userId);
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
    public UserMSTEntity userInfo(String userId) throws Exception {
        return sqlSession.selectOne("selectUserInfo", userId);
    }

    /**
     * 권한별 사용자 조회
     * @param params
     * @return
     * @throws Exception
     */
    public List<UserMSTEntity> findUserByRoleId(RoleEntity params) throws Exception {
        return sqlSession.selectList("findUserByRoleId", params);
    }

    /**
     * 권한별 제외 사용자 조회
     * @param params
     * @return
     * @throws Exception
     */
    public List<UserMSTEntity> findExceptUserByRoleId(RoleEntity params) throws Exception {
        return sqlSession.selectList("findExceptUserByRoleId", params);
    }

}
