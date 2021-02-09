package com.insummnia.webpjt.board.impl;

import com.insummnia.webpjt.board.entity.ReplyEntity;
import com.insummnia.webpjt.common.entity.CommonResultEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReplyServiceImpl implements ReplyService {

    @Autowired
    private ReplyDAO replyDAO;

    /**
     * 댓글 작성
     * @param params
     * @return result
     * @throws Exception
     */
    @Transactional(rollbackFor = Exception.class)
    public CommonResultEntity writeReplyContent(ReplyEntity params) throws Exception {
        params.setReplyId(replyDAO.findReplyIdByBoardId(params));
        
        CommonResultEntity result = new CommonResultEntity();

        try {
            replyDAO.writeReplyContent(params);
            result.setSuccess(true);
            result.setMessage("댓글 작성 완료하였습니다!");
        } catch (Exception e) {
            result.setSuccess(false);
            result.setMessage("댓글 작성에 실패하였습니다!");
        }

        return result;
    }
    
}
