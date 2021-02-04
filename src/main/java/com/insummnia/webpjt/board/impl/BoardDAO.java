package com.insummnia.webpjt.board.impl;

import com.insummnia.webpjt.board.entity.BoardEntity;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BoardDAO {
    
    private final Logger logger = LoggerFactory.getLogger(BoardDAO.class);
    
    @Autowired
    private SqlSession sqlSession;

    public BoardEntity findBoardIdByUrl(BoardEntity params) throws Exception {
        return sqlSession.selectOne("findBoardIdByUrl", params);
    }

}
