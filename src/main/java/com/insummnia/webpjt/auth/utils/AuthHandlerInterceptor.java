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
        logger.info("AuthHandlerInterceptor ==> preHandle ==> getRequestURI ==> {}", request.getRequestURI());
        
        HttpSession session = request.getSession();

        logger.info("AuthHandlerInterceptor ==> preHandle ==> session ==> {}", session.getAttribute("loginUser"));
        logger.info("AuthHandlerInterceptor ==> preHandle ==> session ==> {}", session.getAttribute("menu"));
        
        if(session.getAttribute("loginUser") != null && session.getAttribute("menu") != null){
            session.setMaxInactiveInterval(30 * 60);
            return true;
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "You're Not Login ! Please Login !");
            return false;
        }
        
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {    
        logger.info("AuthHandlerInterceptor ==> postHandle");
        logger.info("session ==> {}", request.getSession().getAttribute("loginUser"));
        logger.info("session ==> {}", request.getSession().getAttribute("menu"));
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        logger.info("AuthHandlerInterceptor ==> afterCompletion");
    }

}
