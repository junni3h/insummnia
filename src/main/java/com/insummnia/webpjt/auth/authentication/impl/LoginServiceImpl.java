package com.insummnia.webpjt.auth.authentication.impl;

import java.util.HashMap;
import java.util.Map;

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

        Map<String, Object> rtnMap = new HashMap<String,Object>();
        UserMSTEntity loginUser = new UserMSTEntity();

        Boolean isUserCheck = false;
        isUserCheck = userDAO.loginCheck(user);

        if(isUserCheck){
            // 로그인 사용자 정보 조회
            loginUser = userDAO.userInfo(user.getUserId());
            // 로그인 후 최근 로그인 시간 업데이트
            userDAO.loginUpdate(user.getUserId());

            rtnMap.put("isLogin", true);
            rtnMap.put("loginUser", loginUser);
            rtnMap.put("message", "로그인에 성공하였습니다!");
        } else {
            rtnMap.put("isLogin", false);
            rtnMap.put("loginUser", null);
            rtnMap.put("message", "로그인에 실패하였습니다!");
        }

        return rtnMap;
    }

}
