package com.insummnia.webpjt.board.entity;

import java.io.Serializable;

import javax.persistence.Entity;

import com.insummnia.webpjt.common.entity.CommonEntity;

@Entity
public class ReplyEntity extends CommonEntity implements Serializable  {

	private static final long serialVersionUID = 1L;
    
    private Integer replyId;
    private String  replyContent;

    private String  boardId;
    private Integer boardSeq;

    public Integer getReplyId() {
        return replyId;
    }

    public void setReplyId(Integer replyId) {
        this.replyId = replyId;
    }

    public String getReplyContent() {
        return replyContent;
    }

    public void setReplyContent(String replyContent) {
        this.replyContent = replyContent;
    }

    public String getBoardId() {
        return boardId;
    }

    public void setBoardId(String boardId) {
        this.boardId = boardId;
    }

    public Integer getBoardSeq() {
        return boardSeq;
    }

    public void setBoardSeq(Integer boardSeq) {
        this.boardSeq = boardSeq;
    }

    @Override
    public String toString() {
        return "ReplyEntity [boardId=" + boardId + ", boardSeq=" + boardSeq + ", replyContent=" + replyContent
                + ", replyId=" + replyId + "]";
    }

}
