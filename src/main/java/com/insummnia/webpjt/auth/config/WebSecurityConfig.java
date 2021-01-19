package com.insummnia.webpjt.auth.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private DataSource dataSource;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

        auth.jdbcAuthentication().dataSource(dataSource);
        auth
                .userDetailsService(userDetailsService())
                .passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.csrf().disable() // CSRF 프로텍션 비활성화
                    .httpBasic().disable() // HTTP 기본 인증 비활성화
                    .formLogin().disable() // 폼 기반 인증 비활성화
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // stateless한 세션 정책 설정
                                        .and()
                    .authorizeRequests() // 리소스별 허용범위 설정
                        .antMatchers("/login.json", "/authenticate.json").permitAll()
                        .anyRequest().authenticated()
                        .and()
                    // 인증 오류 발생시 처리를 위한 핸들러 추가
                    .exceptionHandling().authenticationEntryPoint(new RestAuthenticationEntryPoint());
    }

}
