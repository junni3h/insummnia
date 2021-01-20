package com.insummnia.webpjt.user.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.insummnia.webpjt.user.entity.UserMSTEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserDAO userDAO;

    @Transactional(rollbackFor = Exception.class)
    public Map<String, Object> userRegist(UserMSTEntity params) throws Exception {

        Map<String, Object> rtnMap = new HashMap<String, Object>();

        Boolean isRegist = false;

        try {
            userDAO.userRegist(params);
            
            try {
                isRegist = userDAO.userCheck(params.getUserId());

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

    public List<UserMSTEntity> userList() throws Exception {
        List<UserMSTEntity> rtnList = new ArrayList<UserMSTEntity>();
        rtnList = userDAO.userList();

        return rtnList;
    }

    public UserMSTEntity userInfo(String userId) throws Exception {
        UserMSTEntity rtnParams = new UserMSTEntity();
        rtnParams = userDAO.userInfo(userId).get(0);

        return rtnParams;
    }

}
