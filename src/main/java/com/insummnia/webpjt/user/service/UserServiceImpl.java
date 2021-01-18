package com.insummnia.webpjt.user.service;

import java.util.ArrayList;
import java.util.List;

import com.insummnia.webpjt.user.entity.UserEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    UserDAO userDAO;

    @Transactional(rollbackFor = Exception.class)
    public List<UserEntity> userRegist(UserEntity params) throws Exception {

        List<UserEntity> rtnParam = new ArrayList<UserEntity>();

        try {
            userDAO.userRegist(params);
            rtnParam = userDAO.userInfo(params.getUserId());
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
        }

        return rtnParam;

    }

}
