package com.insummnia.webpjt.board.impl;

import java.util.List;

import com.insummnia.webpjt.board.entity.BoardEntity;
import com.insummnia.webpjt.board.entity.ReplyEntity;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ReplyDAO {

    @Autowired
    private SqlSession sqlSession;

    /**
     * 게시글별 댓글 조회
     * @param params BoardEntity
     * @return List<ReplyEntity>
     * @throws Exception
     */
    public List<ReplyEntity> findReplyContentByBoard(BoardEntity params) throws Exception {
        return sqlSession.selectList("findReplyContentByBoard", params);
    }

    /**
     * 댓글 아이디 생성
     * @param params
     * @return
     * @throws Exception
     */
    public Integer findReplyIdByBoardId(ReplyEntity params) throws Exception {
        return sqlSession.selectOne("findReplyIdByBoardId", params);
    }

    /**
     * 댓글 작성
     * @param params
     * @throws Exception
     */
    public void writeReplyContent(ReplyEntity params) throws Exception {
        sqlSession.insert("writeReplyContent", params);
    }
    
}
