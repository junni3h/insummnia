package com.insummnia.webpjt.common.config;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebListener
public class SessionConfig implements HttpSessionListener {

    private final Logger logger = LoggerFactory.getLogger(SessionConfig.class);

    private Map<String, HttpSession> sessions = new ConcurrentHashMap<>();

    @Override
    public void sessionCreated(HttpSessionEvent event) {
        logger.info("Session Created");
    
        sessions.put(event.getSession().getId(), event.getSession());
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
        logger.info("Session Destoryed");
    
        if(sessions.get(event.getSession().getId()) != null) {
            sessions.get(event.getSession().getId()).invalidate();
            sessions.remove(event.getSession().getId());
        }
    }

    
}
