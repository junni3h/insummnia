package com.insummnia.webpjt.board.impl;

import java.util.List;
import java.util.Map;

import com.insummnia.webpjt.board.entity.BoardEntity;

public interface BoardService {

    /**
     * 게시판 아이디별 게시판 조회
     * @param params 게시판 아이디
     * @return
     * @throws Exception
     */
    public BoardEntity findBoardById(BoardEntity params) throws Exception;
    
    /**
     * 게시판 Url별 게시판 조회
     * @param params 게시판 URL
     * @return
     * @throws Exception
     */
    public BoardEntity findBoardByUrl(BoardEntity params) throws Exception;

    /**
     * 게시판 ID별 게시판 게시글 조회
     * @param params
     * @return
     * @throws Exception
     */
    public List<BoardEntity> findBoardContentById(BoardEntity params) throws Exception;

    /**
     * 게시판 게시글 조회
     * @param params
     * @return
     * @throws Exception
     */
    public BoardEntity findBoardContent(BoardEntity params) throws Exception;
        
    /**
     * 게시글 작성
     * @param params
     * @return
     * @throws Exception
     */
    public Map<String, Object> wirteBoardContent(BoardEntity params) throws Exception;

    /**
     * 게시글 수정
     * @param params
     * @return
     * @throws Exception
     */
    public Map<String, Object> updateBoardContent(BoardEntity params) throws Exception;

    /**
     * 게시글 삭제
     * @param params
     * @return
     * @throws Exception
     */
    public Map<String, Object> deleteBoardContent(BoardEntity params) throws Exception;
}
