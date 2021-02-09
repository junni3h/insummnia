package com.insummnia.webpjt.board.impl;

import com.insummnia.webpjt.board.entity.ReplyEntity;
import com.insummnia.webpjt.common.entity.CommonResultEntity;

public interface ReplyService {

    /**
     * 댓글 작성
     * @param params
     * @return result
     * @throws Exception
     */
    public CommonResultEntity writeReplyContent(ReplyEntity params) throws Exception;
    
}
