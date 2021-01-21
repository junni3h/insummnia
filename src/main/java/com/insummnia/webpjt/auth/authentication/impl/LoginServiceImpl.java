package com.insummnia.webpjt.auth.authentication.impl;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.insummnia.webpjt.user.entity.UserMSTEntity;
import com.insummnia.webpjt.user.impl.UserDAO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {

    private final Logger logger = LoggerFactory.getLogger(LoginServiceImpl.class);
    
    @Autowired
    private UserDAO userDAO;

    public Map<String, Object> login(UserMSTEntity user) throws Exception {
        logger.info("LoginService ==> login");
        logger.info("password ==> {}", user.getPassword());

        Map<String, Object> rtnMap = new HashMap<String,Object>();
        UserMSTEntity loginInfo = new UserMSTEntity();

        Boolean isUserCheck = false;
        isUserCheck = userDAO.loginCheck(user);

        if(isUserCheck){
            loginInfo = userDAO.userInfo(user.getUserId());

            rtnMap.put("isLogin", true);
            rtnMap.put("loginUser", loginInfo);
        } else {
            rtnMap.put("isLogin", false);
            rtnMap.put("loginUser", null);
        }

        return rtnMap;
    }

}
