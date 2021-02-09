package com.insummnia.webpjt.admin.menu.impl;

import java.util.List;

import com.insummnia.webpjt.admin.menu.entity.MenuEntity;
import com.insummnia.webpjt.admin.menu.entity.MenuTreeEntity;
import com.insummnia.webpjt.user.entity.UserMSTEntity;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MenuMgmtDAO {

    private final Logger logger = LoggerFactory.getLogger(MenuMgmtDAO.class);
    
    @Autowired
    private SqlSession sqlSession;

    /**
     * 모든 메뉴조회
     * @return
     * @throws Exception
     */

    public List<MenuEntity> findMenuItemByAll() throws Exception {
        return sqlSession.selectList("findMenuItemByAll");
    }

    /**
     * 모든 부모 메뉴조회(트리)
     * @return
     * @throws Exception
     */

    public List<MenuTreeEntity> findParentTreeItem() throws Exception {
        return sqlSession.selectList("findParentTreeItem");
    }

    /**
     * 취상위 부모 메뉴(루트)조회
     * @return
     * @throws Exception
     */

    public MenuEntity findRootMenuItem() throws Exception {
        return sqlSession.selectOne("findRootMenuItem");
    }

    /**
     * 루트 메뉴별 하위 메뉴조회
     * @param params
     * @return
     * @throws Exception
     */

    public List<MenuEntity> findMenuItemByRoot(UserMSTEntity user) throws Exception {
        logger.info("user(DAO) ==> {}", user);
        return sqlSession.selectList("findMenuItemByRoot", user);
    }

    /**
     * 상위 메뉴별 하위 메뉴조회
     * @param params 상위 메뉴 아이디
     * @return
     * @throws Exception
     */

    public List<MenuEntity> findMenuItemByUpperId(String menuId) throws Exception {
        return sqlSession.selectList("findMenuItemByUpperId", menuId);
    }

    /**
     * 메뉴 아이디별 메뉴조회
     * @param menuId
     * @return
     * @throws Exception
     */
    public MenuEntity findMenuItemByMenuId(String menuId) throws Exception {
        return sqlSession.selectOne("findMenuItemByMenuId", menuId);
    }

    public void upsertMenuItem(MenuEntity params) throws Exception {
        sqlSession.insert("upsertMenuItem", params);
    }

    public void deleteMenuItem(MenuEntity params) throws Exception {
        sqlSession.update("deleteMenuItem", params);
    }

}
