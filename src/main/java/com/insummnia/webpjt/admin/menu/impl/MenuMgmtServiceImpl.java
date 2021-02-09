package com.insummnia.webpjt.admin.menu.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.insummnia.webpjt.admin.menu.entity.MenuEntity;
import com.insummnia.webpjt.admin.menu.entity.MenuTreeEntity;
import com.insummnia.webpjt.user.entity.UserMSTEntity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MenuMgmtServiceImpl implements MenuMgmtService {

    private final Logger logger = LoggerFactory.getLogger(MenuMgmtServiceImpl.class);

    @Autowired
    private MenuMgmtDAO menuDAO;

    /**
     * 메뉴 트리조회
     * @return
     * @throws Exception
     */
    public MenuTreeEntity findMenuItemByTree() throws Exception {

        MenuTreeEntity root = new MenuTreeEntity();

        // 전체 메뉴 조회
        List<MenuEntity> allMenus = new ArrayList<MenuEntity>();
        allMenus = menuDAO.findMenuItemByAll();

        // 자식 메뉴를 가진 부모 메뉴 조회
        List<MenuTreeEntity> parents = new ArrayList<MenuTreeEntity>();
        parents = menuDAO.findParentTreeItem();

        List<MenuTreeEntity> children = new ArrayList<MenuTreeEntity>();

        for(MenuEntity menu : allMenus){
            if(Boolean.parseBoolean(menu.getHasParent())){
                MenuTreeEntity tree = new MenuTreeEntity();
                tree.setId(menu.getMenuUpperId());
                tree.setChild(this.generateTreeChild(menu));
                children.add(tree);
            } else {
                root.setId(menu.getMenuId());
                root.setLabel(menu.getMenuNm());
            }
        }

        for(MenuTreeEntity parent : parents) {

            for(MenuTreeEntity child : children) {
                if(child.getId().equals(parent.getId())){
                    parent.getChildren().add(child.getChild());
                } 
            }

            if(parent.getUpperId().equals(root.getId())){
                root.getChildren().add(parent);
            }

        }

        return root;
    }

    /**
     * 메뉴 아이디별 메뉴조회
     * @param menu 메뉴아이디
     * @return
     * @throws Exception
     */
    public MenuEntity findMenuItemByMenuId(MenuEntity menu) throws Exception {
        MenuEntity rtnMenu = new MenuEntity();
        rtnMenu = menuDAO.findMenuItemByMenuId(menu.getMenuId());
        return rtnMenu;
    }

    /**
     * 루트 메뉴별 하위 메뉴 조회
     * @param params
     * @return
     * @throws Exception
     */
    public List<MenuEntity> findMenuItemByRoot(UserMSTEntity user) throws Exception {
        logger.info("user ==> {}", user);
        List<MenuEntity> rtnMenus = new ArrayList<MenuEntity>();
        rtnMenus = menuDAO.findMenuItemByRoot(user);

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
    
    /**
     * 메뉴 아이템 추가 및 수정
     * @param params
     * @return
     * @throws Exception
     */
    @Transactional(rollbackFor = Exception.class)
    public Map<String, Object> upsertMenuItem(MenuEntity params) throws Exception {
        Map<String, Object> rtnMap = new HashMap<String, Object>();

        try {
            menuDAO.upsertMenuItem(params);
            
            rtnMap.put("success", true);
            rtnMap.put("message", "저장되었습니다!");
        } catch (Exception e) {
            rtnMap.put("success", false);
            rtnMap.put("message", "저장에 실패하였습니다!");
        }

        return rtnMap;
    }

    /**
     * 메뉴 아이템 삭제
     * @param params
     * @return
     * @throws Exception
     */
    @Transactional(rollbackFor = Exception.class)
    public Map<String, Object> deleteMenuItem(MenuEntity params) throws Exception {
        Map<String, Object> rtnMap = new HashMap<String, Object>();

        try {
            menuDAO.deleteMenuItem(params);
            
            rtnMap.put("success", true);
            rtnMap.put("message", "삭제되었습니다!");
        } catch (Exception e) {
            rtnMap.put("success", false);
            rtnMap.put("message", "삭제에 실패하였습니다!");
        }

        return rtnMap;
    }

    private MenuTreeEntity generateTreeChild(MenuEntity menu) throws Exception {
        MenuTreeEntity rtnMenu = new MenuTreeEntity();

        rtnMenu.setId(menu.getMenuId());
        rtnMenu.setLabel(menu.getMenuNm());

        return rtnMenu; 
    }
    
}
