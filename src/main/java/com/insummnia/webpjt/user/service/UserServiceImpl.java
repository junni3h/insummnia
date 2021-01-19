package com.insummnia.webpjt.user.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.insummnia.webpjt.user.entity.UserEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserDAO userDAO;

    @Transactional(rollbackFor = Exception.class)
    public Map<String, Object> userRegist(UserEntity params) throws Exception {

        Map<String, Object> rtnMap = new HashMap<String, Object>();
        List<UserEntity> rtnParam = new ArrayList<UserEntity>();

        try {

            userDAO.userRegist(params);
            rtnParam = userDAO.userInfo(params.getUserId());

            if(rtnParam.size() != 0){
                rtnMap.put("regist", true);
                rtnMap.put("message", "회원가입에 성공하였습니다!");
            } else {
                rtnMap.put("regist", false);
                rtnMap.put("message", "회원가입에 실패하였습니다!");
            } 

        } catch (Exception e) {
            rtnMap.put("regist", false);
            rtnMap.put("message", "회원가입에 실패하였습니다!");
        }

        return rtnMap;
    }

    public List<UserEntity> userList() throws Exception {
        List<UserEntity> rtnList = new ArrayList<UserEntity>();
        rtnList = userDAO.userList();

        return rtnList;
    }

}
