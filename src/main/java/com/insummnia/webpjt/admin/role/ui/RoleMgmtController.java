package com.insummnia.webpjt.admin.role.ui;

import java.util.ArrayList;
import java.util.List;

import com.insummnia.webpjt.admin.role.entity.RoleEntity;
import com.insummnia.webpjt.admin.role.entity.RoleTreeEntity;
import com.insummnia.webpjt.admin.role.entity.RoleUserEntity;
import com.insummnia.webpjt.admin.role.impl.RoleMgmtService;
import com.insummnia.webpjt.common.entity.CommonResultEntity;

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
@RequestMapping(value = "/role")
public class RoleMgmtController {
    
    private final Logger logger = LoggerFactory.getLogger(RoleMgmtController.class);

    @Autowired
    RoleMgmtService roleMgmtService;

    @RequestMapping(value = "/findRoleTree.json", method = RequestMethod.POST)
    public ResponseEntity findRoleTree() throws Exception {
        List<RoleTreeEntity> rtnTree = new ArrayList<RoleTreeEntity>();
        rtnTree = roleMgmtService.findRoleTree();

        return ResponseEntity.ok(rtnTree);
    }

    @RequestMapping(value = "/findRoleById.json", method = RequestMethod.POST)
    public ResponseEntity findRoleById(@RequestBody RoleEntity params) throws Exception {
        RoleEntity rtnRole = new RoleEntity();
        rtnRole = roleMgmtService.findRoleById(params);
        
        return ResponseEntity.ok(rtnRole);
    }

    @RequestMapping(value = "/updateRoleInfo.json", method = RequestMethod.POST)
    public ResponseEntity updateRoleInfo(@RequestBody RoleEntity params) throws Exception {
        CommonResultEntity result = new CommonResultEntity();

        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = "/updateUserRole.json", method = RequestMethod.POST)
    public ResponseEntity updateUserRole(@RequestBody RoleUserEntity params) throws Exception {
        CommonResultEntity result = new CommonResultEntity();
        result = roleMgmtService.updateUserRole(params);

        return ResponseEntity.ok(result);
    }

}
