package com.insummnia.webpjt.user.ui;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/user")
public class UserController {

    @RequestMapping(value = "/regist.do")
    public String regist() throws Exception {
        return "/user/userRegist";
    }
    
}
