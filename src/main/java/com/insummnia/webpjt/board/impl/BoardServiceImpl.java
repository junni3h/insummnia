package com.insummnia.webpjt.board.impl;

import com.insummnia.webpjt.board.entity.BoardEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardDAO boardDAO;

    /**
     * 게시판 Url별 게시판 아이디 조회
     * @param params
     * @return 게시판 아이디
     * @throws Exception
     */
    public BoardEntity findBoardIdByUrl(BoardEntity params) throws Exception {
        BoardEntity rtnBrd = new BoardEntity();
        rtnBrd = boardDAO.findBoardIdByUrl(params);

        return rtnBrd;
    }
    
}
