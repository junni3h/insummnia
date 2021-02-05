package com.insummnia.webpjt.board.ui;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.insummnia.webpjt.board.entity.BoardEntity;
import com.insummnia.webpjt.board.impl.BoardService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping(value = "/community")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @RequestMapping(value = "/findBoardById.json", method = RequestMethod.POST)
    public ResponseEntity findBoardById(@RequestBody BoardEntity params) throws Exception {
        BoardEntity rtnBrd = new BoardEntity();
        rtnBrd = boardService.findBoardById(params);

        return ResponseEntity.ok(rtnBrd);
    }

    @RequestMapping(value = "/findBoardByUrl.json", method = RequestMethod.POST)
    public ResponseEntity findBoardIdByUrl(@RequestBody BoardEntity params) throws Exception {
        BoardEntity rtnBrd = new BoardEntity();
        rtnBrd = boardService.findBoardByUrl(params);

        return ResponseEntity.ok(rtnBrd);
    }

    @RequestMapping(value = "/findBoardContentById.json", method = RequestMethod.POST)
    public ResponseEntity findBoardContentById(@RequestBody BoardEntity params) throws Exception {
        List<BoardEntity> rtnBrd = new ArrayList<BoardEntity>();
        rtnBrd = boardService.findBoardContentById(params);

        return ResponseEntity.ok(rtnBrd);
    }

    @RequestMapping(value = "/writeBoardContent.json", method = RequestMethod.POST)
    public ResponseEntity writeBoardContent(@RequestBody BoardEntity params) throws Exception {
        Map<String, Object> rtnMap = new HashMap<String, Object>();
        rtnMap = boardService.wirteBoardContent(params);

        return ResponseEntity.ok(rtnMap);
    }
    
}