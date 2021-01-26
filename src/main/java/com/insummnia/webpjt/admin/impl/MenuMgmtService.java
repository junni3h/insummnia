package com.insummnia.webpjt.admin.impl;

import java.util.List;

import com.insummnia.webpjt.admin.entity.MenuEntity;

public interface MenuMgmtService {

    /**
     * 루트 메뉴별 하위 메뉴 조회
     * @param params
     * @return
     * @throws Exception
     */

    public List<MenuEntity> findMenuItemByRoot() throws Exception;
    
    /**
     * 상위 메뉴별 하위 메뉴 조회
     * @param params 상위 메뉴 아이디
     * @return
     * @throws Exception
     */

    public List<MenuEntity> findMenuItembyUpperId(MenuEntity params) throws Exception;

}
