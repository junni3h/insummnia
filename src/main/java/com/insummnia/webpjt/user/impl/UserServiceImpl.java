package com.insummnia.webpjt.user.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.insummnia.webpjt.admin.role.entity.RoleEntity;
import com.insummnia.webpjt.user.entity.UserMSTEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserDAO userDAO;

    /**
     * 사용자 등록
     * @param params 사용자 마스터
     * @return Map<String, Object> 사용자 등록 성공 여부
     * @throws Exception
     **/
    @Transactional(rollbackFor = Exception.class)
    public Map<String, Object> userRegist(UserMSTEntity params) throws Exception {
        Map<String, Object> rtnMap = new HashMap<String, Object>();

        Boolean isRegist = false;

        try {
            userDAO.userRegist(params);
            
            try {
                isRegist = userDAO.userCheck(params);

                rtnMap.put("regist", isRegist);
                rtnMap.put("message", "회원가입에 성공하였습니다!");
            } catch (Exception e) {
                rtnMap.put("regist", isRegist);
                rtnMap.put("message", "회원가입에 실패하였습니다!");
            }
        } catch (Exception e) {
            rtnMap.put("regist", isRegist);
            rtnMap.put("message", "회원가입에 실패하였습니다!");
        }

        return rtnMap;
    }

    /**
     * 사용자 정보 수정
     * @param params 사용자 마스터
     * @return Map<String, Objecty> 사용자 수정 성공 여부
     * @throws Exception
     **/
    @Transactional(rollbackFor = Exception.class)
    public Map<String, Object> userUpdate(UserMSTEntity params) throws Exception {
        Map<String, Object> rtnMap = new HashMap<String, Object>();
        Boolean isUpdate = false;

        try {
            userDAO.userUpdate(params);

            isUpdate = true;
            rtnMap.put("update", isUpdate);
            rtnMap.put("message", "회원 수정에 성공하였습니다!");
        } catch (Exception e) {
            rtnMap.put("update", isUpdate);
            rtnMap.put("message", e.getMessage());
        }

        return rtnMap;
    }

    /**
     * 사용자 리스트 조회
     * @return List<UserEntity> 사용자 리스트
     * @throws Exception
     **/
    public List<UserMSTEntity> userList() throws Exception {
        List<UserMSTEntity> rtnList = new ArrayList<UserMSTEntity>();
        rtnList = userDAO.userList();

        return rtnList;
    }

    /**
     * 사용자 조회
     * @param userId 사용자 아이디
     * @return UserEntity 사용자 리스트
     * @throws Exception
     **/
    public UserMSTEntity userInfo(String userId) throws Exception {
        UserMSTEntity rtnParams = new UserMSTEntity();
        rtnParams = userDAO.userInfo(userId);

        return rtnParams;
    }

    /**
     * 사용자 아이디 중복검사 체크
     * @param params 사용자 아이디
     * @return
     * @throws Exception
     */
    public Boolean findUserDuplicationById(UserMSTEntity params) throws Exception {
        Boolean duplication = false;
        duplication = userDAO.findUserDuplicationById(params);

        return duplication;
    }

    /**
     * 사용자 별명 중복검사 체크
     * @param params 사용자 별명
     * @return
     * @throws Exception
     */
    public Boolean findUserDuplicationByNickName(UserMSTEntity params) throws Exception {
        Boolean duplication = false;
        duplication = userDAO.findUserDuplicationByNickName(params);

        return duplication;
    }

    /**
     * 권한별 사용자 조회
     * @param params 권한 아이디
     * @return
     * @throws Exception
     */
    public List<UserMSTEntity> findUserByRoleId(RoleEntity params) throws Exception {
        List<UserMSTEntity> rtnParams = new ArrayList<UserMSTEntity>();
        rtnParams = userDAO.findUserByRoleId(params);

        return rtnParams;
    }

    /**
     * 권한별 제외 사용자 조회
     * @param params 권한 아이디
     * @return
     * @throws Exception
     */
    public List<UserMSTEntity> findExceptUserByRoleId(RoleEntity params) throws Exception {
        List<UserMSTEntity> rtnParams = new ArrayList<UserMSTEntity>();
        rtnParams = userDAO.findExceptUserByRoleId(params);

        return rtnParams;
    }

}
