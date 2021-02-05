package com.insummnia.webpjt.board.impl;

import java.util.List;

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


    /**
     * 게시판 아이디별 게시판 조회
     * @param params 게시판 아이디
     * @return
     * @throws Exception
     */
    public BoardEntity findBoardById(BoardEntity params) throws Exception {
        return sqlSession.selectOne("findBoardById", params);
    }

    /**
     * 게시판 URL별 게시판 조회
     * @param params 게시판 URL
     * @return
     * @throws Exception
     */
    public BoardEntity findBoardByUrl(BoardEntity params) throws Exception {
        return sqlSession.selectOne("findBoardByUrl", params);
    }

    /**
     * 게시판 ID별 게시판 게시글 조회
     * @param params
     * @return
     * @throws Exception
     */
    public List<BoardEntity> findBoardContentById(BoardEntity params) throws Exception {
        return sqlSession.selectList("findBoardContentById", params);
    }

    /**
     * 게시글 작성 순번 조회
     * @param params
     * @return
     * @throws Exception
     */
    public Integer findBoardSeqById(BoardEntity params) throws Exception {
        return sqlSession.selectOne("findBoardSeqById", params);
    }

    /**
     * 게시판 게시글 작성
     * @param params
     * @throws Exception
     */
    public void wirteBoardContent(BoardEntity params) throws Exception {
        sqlSession.insert("wirteBoardContent", params);
    }

}
