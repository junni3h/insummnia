package com.insummnia.webpjt.board.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.insummnia.webpjt.board.entity.BoardEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardDAO boardDAO;

    /**
     * 게시판 아이디별 게시판 조회
     * @param params 게시판 아이디
     * @return
     * @throws Exception
     */
    public BoardEntity findBoardById(BoardEntity params) throws Exception {
        BoardEntity rtnBrd = new BoardEntity();
        rtnBrd = boardDAO.findBoardById(params);

        return rtnBrd;
    }

    /**
     * 게시판 Url별 게시판 조회
     * @param params 게시판 URL
     * @return
     * @throws Exception
     */
    public BoardEntity findBoardByUrl(BoardEntity params) throws Exception {
        BoardEntity rtnBrd = new BoardEntity();
        rtnBrd = boardDAO.findBoardByUrl(params);

        return rtnBrd;
    }

    /**
     * 게시판 ID별 게시판 게시글 조회
     * @param params
     * @return
     * @throws Exception
     */
    public List<BoardEntity> findBoardContentById(BoardEntity params) throws Exception {
        List<BoardEntity> rtnBrd = new ArrayList<BoardEntity>();
        rtnBrd = boardDAO.findBoardContentById(params);

        return rtnBrd;
    }

    /**
     * 게시판 게시글 조회
     * @param params
     * @return
     * @throws Exception
     */
    public BoardEntity findBoardContent(BoardEntity params) throws Exception {
        BoardEntity rtnBrd = new BoardEntity();
        rtnBrd = boardDAO.findBoardContent(params);

        return rtnBrd;
    }

    /**
     * 게시글 작성
     * @param params
     * @return
     * @throws Exception
     */
    @Transactional(rollbackFor = Exception.class)
    public Map<String, Object> wirteBoardContent(BoardEntity params) throws Exception {
        Integer boardSeq = boardDAO.findBoardSeqById(params);
        params.setBoardSeq(boardSeq);

        Map<String, Object> rtnMap = new HashMap<String, Object>();
        
        try {
            boardDAO.wirteBoardContent(params);

            rtnMap.put("success", true);
            rtnMap.put("boardId", params.getBoardId());
            rtnMap.put("boardSeq", params.getBoardSeq());
            rtnMap.put("message", "게시글 작성 완료되었습니다!");
            
        } catch (Exception e) {
            rtnMap.put("success", false);
            rtnMap.put("message", "게시글 작성 실패되었습니다!");
        }

        return rtnMap;
    }

    /**
     * 게시글 수정
     * @param params
     * @return
     * @throws Exception
     */
    @Transactional(rollbackFor = Exception.class)
    public Map<String, Object> updateBoardContent(BoardEntity params) throws Exception {
        Map<String, Object> rtnMap = new HashMap<String, Object>();
        
        try {
            boardDAO.updateBoardContent(params);

            rtnMap.put("success", true);
            rtnMap.put("boardId", params.getBoardId());
            rtnMap.put("boardSeq", params.getBoardSeq());
            rtnMap.put("message", "게시글 수정이 완료되었습니다!");
            
        } catch (Exception e) {
            rtnMap.put("success", false);
            rtnMap.put("message", "게시글 수정이 실패하였습니다!");
        }

        return rtnMap;
    }

    /**
     * 게시글 삭제
     * @param params
     * @return
     * @throws Exception
     */
    @Transactional(rollbackFor = Exception.class)
    public Map<String, Object> deleteBoardContent(BoardEntity params) throws Exception {
        Map<String, Object> rtnMap = new HashMap<String, Object>();
        
        try {
            boardDAO.deleteBoardContent(params);

            rtnMap.put("success", true);
            rtnMap.put("message", "게시글 삭제가 완료되었습니다!");
            
        } catch (Exception e) {
            rtnMap.put("success", false);
            rtnMap.put("message", "게시글 삭제가 실패하였습니다!");
        }

        return rtnMap;
    }
    
}
