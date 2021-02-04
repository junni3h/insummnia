package com.insummnia.webpjt.board.entity;

import java.io.Serializable;

import javax.persistence.Entity;

import com.insummnia.webpjt.common.entity.CommonEntity;

@Entity
public class BoardEntity extends CommonEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    
    private String boardId;
    private String boardNm;
    private String boardUrl;

    private Integer boardSeq;
    private String boardTitle;
    private String boardContent;

    public String getBoardId() {
        return boardId;
    }

    public void setBoardId(String boardId) {
        this.boardId = boardId;
    }

    public String getBoardNm() {
        return boardNm;
    }

    public void setBoardNm(String boardNm) {
        this.boardNm = boardNm;
    }

    public String getBoardUrl() {
        return boardUrl;
    }

    public void setBoardUrl(String boardUrl) {
        this.boardUrl = boardUrl;
    }

    public Integer getBoardSeq() {
        return boardSeq;
    }

    public void setBoardSeq(Integer boardSeq) {
        this.boardSeq = boardSeq;
    }

    public String getBoardTitle() {
        return boardTitle;
    }

    public void setBoardTitle(String boardTitle) {
        this.boardTitle = boardTitle;
    }

    public String getBoardContent() {
        return boardContent;
    }

    public void setBoardContent(String boardContent) {
        this.boardContent = boardContent;
    }

    @Override
    public String toString() {
        return "BoardEntity [boardContent=" + boardContent + ", boardId=" + boardId + ", boardNm=" + boardNm
                + ", boardSeq=" + boardSeq + ", boardTitle=" + boardTitle + ", boardUrl=" + boardUrl + "]";
    }

}
