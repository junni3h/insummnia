import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Editor, EditorState, convertToRaw, ContentState } from 'draft-js';
import CommunityAPIRoute from '../../../libs/router/CommunityAPIRoute';
import ReplyAPIRoute from '../../../libs/router/ReplyAPIRoute';

import { Button, ButtonGroup, Container, Grid, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import SubdirectoryArrowRightRoundedIcon from '@material-ui/icons/SubdirectoryArrowRightRounded';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';

import '../../../css/common/common.css';

export default function CommunityViewPage(props) {

    const login = useSelector(state => state.UserReducer);

    const [ board, setBoard ] = useState({});
    const [ boardUrl, setBoardUrl ] = useState("");
    const [ reply, setReply ] = useState([]);

    const [ isModified, setIsModified ] = useState(false);
    const [ isReply, setIsReply ] = useState(false);

    const [ editorState, setEditorState ] = useState(() => EditorState.createEmpty(),);
    const [ replyState, setReplyState ] = useState(() => EditorState.createEmpty(),);

    async function fetchBoardContent(boardId) {
        const params = {};
        params.boardId = boardId;
        params.boardSeq = props.match.params.boardSeq;

        const result = await CommunityAPIRoute.fetchBoardContent(params);
        const data = result.data;

        console.log(result);

        const content = ContentState.createFromText(data.boardContent);
        setEditorState(EditorState.createWithContent(content));
 
        setBoard(data);
        setReply(data.reply);
    }

    async function fetchBoardByUrl() {
        const path = props.match.path;
        const url = path.split("/");

        const params = {};
        params.boardUrl = url[2];

        const result = await CommunityAPIRoute.fetchBoardByUrl(params);
        const data = result.data;

        setBoardUrl(data.boardUrl);
        fetchBoardContent(data.boardId); 
    }

    useEffect(() => {
        fetchBoardByUrl();
    }, []);

    const handleContentModify = () => {
        if(!isModified){
            setIsModified(true);
        } else {
            setIsModified(false);
        }        
    }

    const handleReplyWrite = () => {
        if(!isReply){
            setIsReply(true);
        } else {
            setIsReply(false);
            setReplyState(EditorState.createEmpty());
        }
    }

    const handleSubmit = ( event ) => {
        const params = board;
        params.boardContent = getContent();
        params.updateUserId = login.loginUser.userId;
        console.log(params);

        if(window.confirm("게시글 작성을 완료하시겠습니까?")){
            CommunityAPIRoute.fetchUpdateBoard(params)
                             .then( res => {
                                 const data = res.data;

                                 // 작성 성공 여부
                                if(data.success){
                                    // 성공시 페이지 이동
                                    if(window.confirm(data.message)){
                                       setIsModified(false);
                                    }
                                } else { 
                                    // 실패시 메시지 호출
                                    alert(data.message);
                                }
                             });
        }

        event.preventDefault();
    }

    const handleContentDelete = ( event ) => {
        const params = board;

        if(window.confirm("게시글을 정말 삭제 하시겠습니까?")){
            CommunityAPIRoute.fetchDeleteBoard(params)
                             .then( res => {
                                 const data = res.data;

                                 // 작성 성공 여부
                                if(data.success){
                                    // 성공시 페이지 이동
                                    if(window.confirm(data.message)){
                                       goBacktoList();
                                    }
                                } else { 
                                    // 실패시 메시지 호출
                                    alert(data.message);
                                }
                             });
        }

        event.preventDefault();
    }

    const handleReplySubmit = ( event ) => {
        const params = board;
        params.replyContent = getReplyContent();
        params.createUserId = login.loginUser.userId;
        console.log(params);

        if(window.confirm("댓글 작성을 완료하시겠습니까?")){
            ReplyAPIRoute.fetchWriteReplyContent(params)
                             .then( res => {
                                 const data = res.data;

                                 // 작성 성공 여부
                                if(data.success){
                                    // 성공시 페이지 이동
                                    if(window.confirm(data.message)){
                                        handleReplyWrite();
                                        fetchBoardContent(board.boardId);
                                    }
                                } else { 
                                    // 실패시 메시지 호출
                                    alert(data.message);
                                }
                             });
        }

        event.preventDefault();
    }

    const getContent = () => {
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        return value;
    }

    const getReplyContent = () => {
        const blocks = convertToRaw(replyState.getCurrentContent()).blocks;
        const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        return value;
    }

    const goBacktoList = () => {
        props.history.push(boardUrl);
    }

    return(
        <Container className="container" component="main" maxWidth="lg" color="inherit">
            <form onSubmit={handleSubmit} method="post">
                <TableContainer className="tableContainer">
                    <Table id="table" size="medium">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={12}>
                                    <div className="btnRightField">
                                        <ButtonGroup size="small" aria-label="small outlined button group">
                                            {
                                                board.boardId === "COMMUNITY_NOTICE" ? (
                                                    (
                                                        Object.keys(login).includes('loginUser') ? (
                                                            login.loginUser.roleId === "ROLE_ADMIN" ? (
                                                                isModified ? 
                                                                    (
                                                                        <ButtonGroup size="small" aria-label="small outlined button group">
                                                                            <Button onClick={handleContentModify} color="secondary">
                                                                                취소
                                                                            </Button>
                                                                            <Button type="submit">
                                                                                완료
                                                                            </Button>
                                                                        </ButtonGroup>
                                                                    ) : (
                                                                        <Button onClick={handleContentModify}>
                                                                            수정
                                                                        </Button>
                                                                    )
                                                            ) : (
                                                                null
                                                            )
                                                        ) : (
                                                            null
                                                        )
                                                    )
                                                ) : (
                                                    isModified ? 
                                                        (
                                                            <ButtonGroup size="small" aria-label="small outlined button group">
                                                                <Button onClick={handleContentModify} color="secondary">
                                                                    취소
                                                                </Button>
                                                                <Button type="submit">
                                                                    완료
                                                                </Button>
                                                            </ButtonGroup>
                                                        ) : (
                                                            Object.keys(login).includes('loginUser') ? (
                                                                board.createUserId === login.loginUser.userId ? 
                                                                (
                                                                    <ButtonGroup size="small" aria-label="small outlined button group">
                                                                        <Button color="secondary" onClick={handleContentDelete}>
                                                                            삭제
                                                                        </Button>
                                                                        <Button onClick={handleContentModify}>
                                                                            수정
                                                                        </Button>
                                                                    </ButtonGroup>
                                                                ):(
                                                                    null
                                                                )
                                                            ) : (
                                                                null
                                                            )
                                                        )
                                                )
                                            
                                            }
                                            <Button type="button" onClick={goBacktoList}>
                                                목록
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={2}>제목</TableCell>
                                <TableCell colSpan={10}>
                                    <TextField 
                                        id="boardTitle"
                                        name="boardTitle"
                                        value={board.boardTitle}
                                        size="small" 
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        autoFocus={isModified ? false : true}
                                        disabled={isModified ? false : true}
                                    >
                                    </TextField>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>작성자</TableCell>
                                <TableCell colSpan={2}>
                                    <TextField 
                                        id="createUserName"
                                        name="createUserName"
                                        value={board.createUserNm} 
                                        size="small" 
                                        fullWidth
                                        disabled
                                    >
                                    </TextField>
                                </TableCell>
                                <TableCell colSpan={2}>작성일시</TableCell>
                                <TableCell colSpan={2}>
                                    <Typography className="menuIcon">
                                        {board.createDatetime} 
                                    </Typography>
                                </TableCell>
                                <TableCell colSpan={2}>조회수</TableCell>
                                <TableCell colSpan={2}>
                                    <Typography className="menuIcon">
                                        {board.boardHit} 
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={12}>
                                    <div className="editor">
                                        <Editor editorState={editorState} onChange={setEditorState} readOnly={ isModified ? false : true }/>  
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>
            <form onSubmit={handleReplySubmit} method="post">
                <TableContainer className="tableContainer">
                    <Table id="table" size="medium">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={10}>댓글</TableCell>
                                <TableCell colSpan={2}>
                                        { isReply ? 
                                            (
                                                <div className="btnRightField">
                                                    <ButtonGroup size="small" aria-label="small outlined button group">
                                                        <Button className="rightBtn" onClick={handleReplyWrite} color="secondary">
                                                            취소
                                                        </Button>
                                                        <Button type="submit" className="rightBtn">
                                                            완료
                                                        </Button>
                                                    </ButtonGroup>
                                                </div>
                                            ):(
                                                Object.keys(login).includes("loginUser") ? (
                                                    <div className="btnRightField">
                                                    <ButtonGroup size="small" aria-label="small outlined button group">
                                                        <Button className="rightBtn" onClick={handleReplyWrite}>
                                                            작성
                                                        </Button>
                                                    </ButtonGroup>
                                                    </div>
                                                ) : (
                                                    null
                                                )
                                            )
                                        }
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={12}>
                                    <div className="editor">
                                        <Editor editorState={replyState} onChange={setReplyState} readOnly={ isReply ? false : true }/>  
                                    </div>
                                </TableCell>
                            </TableRow>                     
                        </TableHead>
                        <TableBody>
                            { 
                                reply.map((item) => (
                                    <TableRow>
                                        <TableCell colSpan={12}>
                                            <TextField 
                                                id="replyContent"
                                                name="replyContent"
                                                value={item.replyContent} 
                                                size="small"
                                                variant="outlined"
                                                label={item.createUserNm}
                                                InputProps={
                                                    {
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <SubdirectoryArrowRightRoundedIcon fontSize="small"/>
                                                            </InputAdornment>
                                                        )
                                                    }
                                                }
                                                fullWidth
                                                disabled
                                            >
                                            </TextField>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>
        </Container>
    );
}