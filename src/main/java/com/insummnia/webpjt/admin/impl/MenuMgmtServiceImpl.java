package com.insummnia.webpjt.admin.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.insummnia.webpjt.admin.entity.MenuEntity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuMgmtServiceImpl implements MenuMgmtService {

    private final Logger logger = LoggerFactory.getLogger(MenuMgmtServiceImpl.class);

    @Autowired
    private MenuMgmtDAO menuDAO;

    public MenuEntity findMenuItemByTree() throws Exception {

        MenuEntity rootMenu = new MenuEntity();

        List<MenuEntity> allMenus = new ArrayList<MenuEntity>();
        allMenus = menuDAO.findMenuItemByAll();

        List<MenuEntity> parents = new ArrayList<MenuEntity>();
        parents = menuDAO.findParentMenuItem();
        
        List<MenuEntity> children = new ArrayList<MenuEntity>();

        for(MenuEntity menu : allMenus) {
            if(Boolean.parseBoolean(menu.getHasParent())){
                MenuEntity child = new MenuEntity();
                child.setMenuId(menu.getMenuUpperId());
                child.setChild(menu);
                children.add(child); 
            } else {
                rootMenu = menu;
            }
        }

        for(MenuEntity menu : parents) {

            for(MenuEntity child: children){
                if(menu.getMenuId().equals(child.getMenuId())){
                    menu.getChildren().add(child);
                }
            }

            if(menu.getMenuUpperId().equals(rootMenu.getMenuId())){
                rootMenu.getChildren().add(menu);
            }

        }

        return rootMenu;
    }

    /**
     * 루트 메뉴별 하위 메뉴 조회
     * @param params
     * @return
     * @throws Exception
     */

    public List<MenuEntity> findMenuItemByRoot() throws Exception {
        List<MenuEntity> rtnMenus = new ArrayList<MenuEntity>();
        rtnMenus = menuDAO.findMenuItemByRoot();

        return rtnMenus;
    }

    /**
     * 상위 메뉴별 하위 메뉴 조회
     * @param menuId 상위 메뉴 아이디
     * @return
     * @throws Exception
     */

    public List<MenuEntity> findMenuItemByUpperId(String menuId) throws Exception {
        List<MenuEntity> rtnMenus = new ArrayList<MenuEntity>();
        rtnMenus = menuDAO.findMenuItemByUpperId(menuId);

        return rtnMenus;
    }
    
}
