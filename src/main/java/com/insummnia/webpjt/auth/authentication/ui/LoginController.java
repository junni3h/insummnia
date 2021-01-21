package com.insummnia.webpjt.auth.authentication.ui;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.insummnia.webpjt.auth.authentication.impl.LoginService;
import com.insummnia.webpjt.common.utils.CommonUtils;
import com.insummnia.webpjt.user.entity.UserMSTEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;
    
    @RequestMapping(value = "/login.do", method = RequestMethod.POST)
    public ResponseEntity login(HttpServletRequest request, @RequestBody UserMSTEntity user) throws Exception {
        
        HttpSession session = request.getSession();
        Map<String, Object> rtnMap = new HashMap<String, Object>();

        //패스워드를 SHA-256으로 인코딩
        String password = user.getPassword();
        String rtnPassword = CommonUtils.encodePwd(password);

        //SHA-256로 인코딩한 패스워드를 다시 UserEntity에 SET.
        user.setPassword(rtnPassword);

        Map<String, Object> rtnLogin = new HashMap<String, Object>(); 
        rtnLogin = loginService.login(user);
        
        if((boolean) rtnLogin.get("isLogin")) {
            session.setAttribute("loginUser", rtnLogin.get("loginUser"));
            session.setMaxInactiveInterval(5000);
            
            rtnMap.put("isLogin", (boolean) rtnLogin.get("isLogin"));
            rtnMap.put("message", "로그인에 성공하였습니다!");

        } else {
            rtnMap.put("isLogin", (boolean) rtnLogin.get("isLogin"));
            rtnMap.put("message", "로그인에 실패하였습니다!");
        }
        
        return ResponseEntity.ok(rtnMap);
    }

    @RequestMapping(value = "/logout.do")
    public ResponseEntity logout(HttpServletRequest request) throws Exception {

        Map<String, Object> rtnMap = new HashMap<String, Object>();
        HttpSession session = request.getSession();
        
        if(request.getSession().getAttribute("loginUser") != null){
            session.invalidate();

            rtnMap.put("isLogout", true);
            rtnMap.put("message", "로그아웃 되었습니다!");
        } else {
            rtnMap.put("isLogout", true);
            rtnMap.put("message", "로그아웃 실패했습니다!");
        }

        return ResponseEntity.ok(rtnMap);
    }

}
