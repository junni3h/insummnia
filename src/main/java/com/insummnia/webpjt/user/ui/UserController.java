package com.insummnia.webpjt.user.ui;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.insummnia.webpjt.common.utils.CommonUtils;
import com.insummnia.webpjt.user.entity.UserEntity;
import com.insummnia.webpjt.user.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@CrossOrigin
@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    UserService userService;

    /**
     * uri: /user/regist.do
     * 회원가입 페이지 View 호출 
     **/
    @RequestMapping(value = "/regist.do")
    public ModelAndView registView() throws Exception {

        ModelAndView mv = new ModelAndView("/user/userRegist");
        
        return mv;
    }

    @RequestMapping(value = "/regist.json", method = RequestMethod.POST)
    public ResponseEntity regist(@RequestBody UserEntity user) throws Exception {

        Map<String, Object> rtnMap = new HashMap<String, Object>();

        //패스워드를 SHA-256으로 인코딩
        String password = user.getPassword();
        String rtnPassword = CommonUtils.encodePwd(password);

        //SHA-256로 인코딩한 패스워드를 다시 UserEntity에 SET.
        user.setPassword(rtnPassword);

        List<UserEntity> rtnParams = new ArrayList<UserEntity>();
        rtnParams = userService.userRegist(user);

        if(rtnParams.size() != 0){
            rtnMap.put("regist", true);
            rtnMap.put("message", "회원가입에 성공하였습니다!");
        } else {
            rtnMap.put("regist", false);
            rtnMap.put("message", "회원가입에 실패하였습니다!");
        } 

        return ResponseEntity.ok(rtnMap);
    }

}
