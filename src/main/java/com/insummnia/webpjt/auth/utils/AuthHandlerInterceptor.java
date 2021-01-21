package com.insummnia.webpjt.auth.utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Component
public class AuthHandlerInterceptor implements HandlerInterceptor {

    private final Logger logger = LoggerFactory.getLogger(AuthHandlerInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        
        logger.info("AuthHandlerInterceptor ==> preHandle");

        HttpSession session = request.getSession(false);

        logger.info("session ==> {}", request.getSession().getAttribute("loginUser"));

        if(session.getAttribute("loginUser") != null) { 
            return true;
        } else {
            logger.info("Not Authorizied!!");
            throw new IllegalArgumentException("Not Authorizied!!");
        }
        
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    
        logger.info("AuthHandlerInterceptor ==> postHandle");
        logger.info("session ==> {}", request.getSession().getAttribute("loginUser"));
    
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
    }

}
