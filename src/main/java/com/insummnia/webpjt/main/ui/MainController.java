package com.insummnia.webpjt.main.ui;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
    
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity index(HttpServletRequest request) throws Exception {
        logger.info("/ 접속");
        HttpSession session = request.getSession();

        return ResponseEntity.ok(session.getAttribute("loginUser"));
    }

    @RequestMapping(value = "/main.do")
    public ResponseEntity main(HttpServletRequest request) throws Exception {
        logger.info("REQUEST URL ==> {}", request.getRequestURI());
        HttpSession session = request.getSession();

        return ResponseEntity.ok(session.getAttribute("loginUser"));
    }


}