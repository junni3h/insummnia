package com.insummnia.webpjt.board.impl;

import com.insummnia.webpjt.board.entity.BoardEntity;

public interface BoardService {
    
        /**
     * 게시판 Url별 게시판 아이디 조회
     * @param params
     * @return 게시판 아이디
     * @throws Exception
     */
    public BoardEntity findBoardIdByUrl(BoardEntity params) throws Exception;

}
