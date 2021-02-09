package com.insummnia.webpjt.admin.menu.impl;

import java.util.List;
import java.util.Map;

import com.insummnia.webpjt.admin.menu.entity.MenuEntity;
import com.insummnia.webpjt.admin.menu.entity.MenuTreeEntity;
import com.insummnia.webpjt.user.entity.UserMSTEntity;

public interface MenuMgmtService {

    /**
     * 메뉴 트리 조회
     * @return
     * @throws Exception
     **/
    public MenuTreeEntity findMenuItemByTree() throws Exception;

    /**
     * 메뉴 아이디별 메뉴조회
     * @param menu 메뉴아이디
     * @return
     * @throws Exception
     **/
    public MenuEntity findMenuItemByMenuId(MenuEntity menu) throws Exception;

    /**
     * 루트 메뉴별 하위 메뉴 조회
     * @param params
     * @return
     * @throws Exception
     **/
    public List<MenuEntity> findMenuItemByRoot(UserMSTEntity user) throws Exception;
    
    /**
     * 상위 메뉴별 하위 메뉴 조회
     * @param menuId 상위 메뉴 아이디
     * @return
     * @throws Exception
     */
    public List<MenuEntity> findMenuItemByUpperId(String menuId) throws Exception;

    /**
     * 메뉴 아이템 추가 및 수정
     * @param params 메뉴 
     * @return 추가 및 수정 성공 유무, 메시지
     * @throws Exception
     */
    public Map<String, Object> upsertMenuItem(MenuEntity params) throws Exception;

    /**
     * 메뉴 아이템 삭제
     * @param params
     * @return 삭제 성공 유무, 메시지
     * @throws Exception
     */
    public Map<String, Object> deleteMenuItem(MenuEntity params) throws Exception;

}
