package com.insummnia.webpjt.admin.menu.ui;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.insummnia.webpjt.admin.menu.entity.MenuEntity;
import com.insummnia.webpjt.admin.menu.entity.MenuTreeEntity;
import com.insummnia.webpjt.admin.menu.impl.MenuMgmtService;

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
@RequestMapping(value = "/menu")
public class MenuMgmtController {

    private final Logger logger = LoggerFactory.getLogger(MenuMgmtController.class);

    @Autowired
    private MenuMgmtService menuService;

    @RequestMapping(value = "/findByMenuId.do", method = RequestMethod.POST)
    public ResponseEntity findMenuItemByMenuId(@RequestBody MenuEntity params) throws Exception {
        MenuEntity rtnMenu = menuService.findMenuItemByMenuId(params);

        return ResponseEntity.ok(rtnMenu);
    }

    @RequestMapping(value = "/findByUpperId.do")
    public ResponseEntity findMenuItemByUpperId(@RequestBody MenuEntity params) throws Exception {
        List<MenuEntity> rtnMenus = new ArrayList<MenuEntity>();
        rtnMenus = menuService.findMenuItemByUpperId(params.getMenuId());

        return ResponseEntity.ok(rtnMenus);
    }

    @RequestMapping(value = "/findByTree.do")
    public ResponseEntity findMenuItemByTree() throws Exception {
        MenuTreeEntity rtnMenu = new MenuTreeEntity();
        rtnMenu = menuService.findMenuItemByTree();

        return ResponseEntity.ok(rtnMenu);
    }

    @RequestMapping(value = "/updateMenu.do", method = RequestMethod.POST)
    public ResponseEntity upsertMenuItem(@RequestBody MenuEntity params) throws Exception {        
        Map<String, Object> rtnMap = new HashMap<String, Object>();
        rtnMap = menuService.upsertMenuItem(params);

        return ResponseEntity.ok(rtnMap);
    }

    @RequestMapping(value = "/deleteMenu.do")
    public ResponseEntity deleteMenuItem(@RequestBody MenuEntity params) throws Exception {
        Map<String, Object> rtnMap = new HashMap<String, Object>();
        rtnMap = menuService.deleteMenuItem(params);

        return ResponseEntity.ok(rtnMap);
    }
    
}
