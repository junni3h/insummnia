package com.insummnia.webpjt.common.config;
import com.insummnia.webpjt.auth.utils.AuthHandlerInterceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    
    @Autowired
    AuthHandlerInterceptor authInterceptor;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        registry.addInterceptor(authInterceptor)
                // 로그인 및 회원가입을 제외한 모든 URL은 인터셉트를 통과해야 함
                .addPathPatterns("/**")
                .addPathPatterns("/*/*.json")
                // 로그인 및 로그아웃 시도는 인증/인가 통과 유무와 상관없이 인터셉터를 거치지 않고 진행이 되어야 함
                .excludePathPatterns(
                        "/main.do"
                    ,   "/login.do"
                    ,   "/logout.do"
                    ,   "/community/*"
                    ,   "/menu/findByUpperId.do"
                    ,   "/user/regist.json"
                    ,   "/user/findUserDuplicationById.json"
                    ,   "/user/findUserDuplicationByNickName.json"
                );
    }
    
}