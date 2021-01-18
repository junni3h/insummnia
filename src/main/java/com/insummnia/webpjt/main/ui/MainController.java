package com.insummnia.webpjt.main.ui;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MainController {
    
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String main() throws Exception {
        System.out.println("/ 접속");
        return "/main/main";
    }

}