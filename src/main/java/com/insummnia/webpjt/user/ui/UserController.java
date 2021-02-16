package com.insummnia.webpjt.user.ui;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.insummnia.webpjt.admin.role.entity.RoleEntity;
import com.insummnia.webpjt.admin.role.entity.RoleUserEntity;
import com.insummnia.webpjt.common.utils.CommonUtils;
import com.insummnia.webpjt.user.entity.UserMSTEntity;
import com.insummnia.webpjt.user.impl.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping(value = "/user")
public class UserController {

    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    /**
     * 사용자 등록
     * @param user 사용자 마스터
     * @return Map<String, Objecty> 사용자 등록 성공 여부
     * @throws Exception
     */
    @RequestMapping(value = "/regist.json", method = RequestMethod.POST)
    public ResponseEntity regist(@RequestBody UserMSTEntity user) throws Exception {
        Map<String, Object> rtnMap = new HashMap<String, Object>();

        //패스워드를 SHA-256으로 인코딩
        String password = user.getPassword();
        String rtnPassword = CommonUtils.encodePwd(password);

        //SHA-256로 인코딩한 패스워드를 다시 UserEntity에 SET.
        user.setPassword(rtnPassword);

        //회원가입 결과 Return
        rtnMap = userService.userRegist(user);

        return ResponseEntity.ok(rtnMap);
    }

    /**
     * 사용자 정보 수정
     * @param user 사용자 마스터
     * @return Map<String, Objecty> 사용자 수정 성공 여부
     * @throws Exception
     */
    @RequestMapping(value = "/update.json", method = RequestMethod.POST)
    public ResponseEntity userUpdate(@RequestBody UserMSTEntity user) throws Exception {
        Map<String, Object> rtnMap = new HashMap<String, Object>();

        //패스워드를 SHA-256으로 인코딩
        String password = user.getPassword();
        String rtnPassword = CommonUtils.encodePwd(password);

        //SHA-256로 인코딩한 패스워드를 다시 UserEntity에 SET.
        user.setPassword(rtnPassword);

        //회원가입 결과 Return
        rtnMap = userService.userUpdate(user);

        return ResponseEntity.ok(rtnMap);
    }

    /**
     * 사용자 리스트 조회
     * @return List<UserMSTEntity> 사용자 마스터 리스트
     * @throws Exception
     */
    @RequestMapping(value = "/list.json", method = RequestMethod.GET)
    public ResponseEntity userList(HttpServletRequest request) throws Exception {
        logger.info("REQUEST URL ==> {}", request.getRequestURI());
        
        HttpSession session = request.getSession();
        logger.info("session ==> {}", session.getAttribute("loginUser"));

        List<UserMSTEntity> rtnList = new ArrayList<UserMSTEntity>();
        rtnList = userService.userList();

        return ResponseEntity.ok(rtnList);
    }

    /**
     * 사용자 조회
     * @param userId 사용자 아이디 ( 사용자 마스터에서 GET )
     * @return 사용자 마스터
     * @throws Exception
     */
    @RequestMapping(value = "/info.json", method = RequestMethod.POST)
    public ResponseEntity userInfo(HttpServletRequest request, @RequestBody UserMSTEntity user) throws Exception {
        logger.info("/info.json");

        HttpSession session = request.getSession();
        logger.info("session ==> {}", session.getAttribute("loginUser"));
        logger.info("session ==> {}", session.getId());

        String userId = user.getUserId();
        UserMSTEntity rtnParams = new UserMSTEntity();
        rtnParams = userService.userInfo(userId);

        return ResponseEntity.ok(rtnParams);
    }

    @RequestMapping(value = "/findUserByRoleId.json", method = RequestMethod.POST)
    public ResponseEntity findUserByRoleId(@RequestBody RoleEntity params) throws Exception { 
        List<UserMSTEntity> roleUsers = new ArrayList<UserMSTEntity>();
        roleUsers = userService.findUserByRoleId(params);

        List<UserMSTEntity> expectUsers = new ArrayList<UserMSTEntity>();
        expectUsers = userService.findExceptUserByRoleId(params);

        RoleUserEntity rtnParams = new RoleUserEntity();
        rtnParams.setRoleUsers(roleUsers);
        rtnParams.setExpectUsers(expectUsers);

        return ResponseEntity.ok(rtnParams);
    }

}
