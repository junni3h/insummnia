package com.insummnia.webpjt.board.ui;

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

    @RequestMapping(value = "/findBoardIdByUrl.json", method = RequestMethod.POST)
    public ResponseEntity findBoardIdByUrl(@RequestBody BoardEntity params) throws Exception {
        BoardEntity rtnBrd = new BoardEntity();
        rtnBrd = boardService.findBoardIdByUrl(params);

        return ResponseEntity.ok(rtnBrd);
    }
    
}
