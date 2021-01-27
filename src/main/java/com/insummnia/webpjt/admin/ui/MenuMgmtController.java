package com.insummnia.webpjt.admin.ui;

import java.util.ArrayList;
import java.util.List;

import com.insummnia.webpjt.admin.entity.MenuEntity;
import com.insummnia.webpjt.admin.impl.MenuMgmtService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping(value = "/menu")
public class MenuMgmtController {

    private final Logger logger = LoggerFactory.getLogger(MenuMgmtController.class);

    @Autowired
    private MenuMgmtService menuService;

    @RequestMapping(value = "/findByUpperId.do")
    public ResponseEntity findMenuItemByUpperId(@RequestBody MenuEntity params) throws Exception {

        logger.info("menuId ==> {}", params);

        List<MenuEntity> rtnMenus = new ArrayList<MenuEntity>();
        rtnMenus = menuService.findMenuItemByUpperId(params.getMenuId());

        return ResponseEntity.ok(rtnMenus);
    }
    
}
