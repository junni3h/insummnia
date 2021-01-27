package com.insummnia.webpjt.admin.impl;

import java.util.ArrayList;
import java.util.List;

import com.insummnia.webpjt.admin.entity.MenuEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuMgmtServiceImpl implements MenuMgmtService {

    @Autowired
    private MenuMgmtDAO menuDAO;

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
