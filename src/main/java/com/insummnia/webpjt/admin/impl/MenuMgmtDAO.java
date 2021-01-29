package com.insummnia.webpjt.admin.impl;

import java.util.List;

import com.insummnia.webpjt.admin.entity.MenuEntity;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MenuMgmtDAO {
    
    @Autowired
    private SqlSession sqlSession;

    /**
     * 모든 메뉴 조회
     * @return
     * @throws Exception
     */

    public List<MenuEntity> findMenuItemByAll() throws Exception {
        return sqlSession.selectList("findMenuItemByAll");
    }

    /**
     * 모든 부모 메뉴 조회
     * @return
     * @throws Exception
     */

    public List<MenuEntity> findParentMenuItem() throws Exception {
        return sqlSession.selectList("findParentMenuItem");
    }

    /**
     * 루트 메뉴별 하위 메뉴 조회
     * @param params
     * @return
     * @throws Exception
     */

    public List<MenuEntity> findMenuItemByRoot() throws Exception {
        return sqlSession.selectList("findMenuItemByRoot");
    }

    /**
     * 상위 메뉴별 하위 메뉴 조회
     * @param params 상위 메뉴 아이디
     * @return
     * @throws Exception
     */

    public List<MenuEntity> findMenuItemByUpperId(String menuId) throws Exception {
        return sqlSession.selectList("findMenuItemByUpperId", menuId);
    }

    /**
     * 취상위 부모 메뉴(루트) 조회
     * @return
     * @throws Exception
     */

    public MenuEntity findRootMenuItem() throws Exception {
        return sqlSession.selectOne("findRootMenuItem");
    }

    /**
     * 메뉴 조회
     * @return
     * @throws Exception
     */

    public List<MenuEntity> findMenuItemByTree() throws Exception {
        return sqlSession.selectList("findMenuItemByTree");
    }
    
}
