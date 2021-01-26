package com.insummnia.webpjt.main.ui;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.insummnia.webpjt.admin.entity.MenuEntity;
import com.insummnia.webpjt.admin.impl.MenuMgmtService;
import com.insummnia.webpjt.user.impl.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class MainController {

    private final Logger logger = LoggerFactory.getLogger(MainController.class);

    @Autowired
    UserService userService;

    @Autowired
    MenuMgmtService menuService;
    
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity index(HttpServletRequest request) throws Exception {
        logger.info("/ 접속");
        HttpSession session = request.getSession();

        return ResponseEntity.ok(session.getAttribute("loginUser"));
    }

    @RequestMapping(value = "/main.do")
    public ResponseEntity main(HttpServletRequest request) throws Exception {
        logger.info("REQUEST URL ==> {}", request.getRequestURI());
        Map<String, Object> rtnParams = new HashMap<String, Object>();

        HttpSession session = request.getSession();

        if(session.getAttribute("loginUser") != null && session.getAttribute("menu") != null){
            rtnParams.put("loginUser", session.getAttribute("loginUser"));
            rtnParams.put("menu", menuService.findMenuItemByRoot());
        } else {
            rtnParams.put("menu", menuService.findMenuItemByRoot());
        }

        return ResponseEntity.ok(rtnParams);
    }


}