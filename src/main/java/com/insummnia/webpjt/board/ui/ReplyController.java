package com.insummnia.webpjt.board.ui;

import com.insummnia.webpjt.board.entity.ReplyEntity;
import com.insummnia.webpjt.board.impl.ReplyService;
import com.insummnia.webpjt.common.entity.CommonResultEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/reply")
public class ReplyController {
    
    @Autowired
    private ReplyService replyService;


    @RequestMapping(value = "/writeReplyContent.json", method = RequestMethod.POST)
    public ResponseEntity writeReplyContent(@RequestBody ReplyEntity params) throws Exception {
        CommonResultEntity result = new CommonResultEntity();
        result = replyService.writeReplyContent(params);

        return ResponseEntity.ok(result);
    }

}
