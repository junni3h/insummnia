import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Editor, EditorState, convertToRaw, ContentState } from 'draft-js';
import CommunityAPIRoute from '../../../router/libs/CommunityAPIRoute';

import { Button, ButtonGroup, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import SubdirectoryArrowRightRoundedIcon from '@material-ui/icons/SubdirectoryArrowRightRounded';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';

import '../../../css/common/common.css';

export default function CommunityViewPage(props) {

    const login = useSelector(state => state.UserReducer);

    const [ board, setBoard ] = useState({});
    const [ boardUrl, setBoardUrl ] = useState("");

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
    
        const content = ContentState.createFromText(data.boardContent);
        setEditorState(EditorState.createWithContent(content));
 
        setBoard(data);
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

    const getContent = () => {
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        return value;
    }

    const goBacktoList = () => {
        props.history.push(boardUrl);
    }

    return(
        <Container className="container" component="main" maxWidth="lg" color="inherit">
            <form onSubmit={handleSubmit} method="post">
                <TableContainer>
                    <Table id="table" size="medium">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={12}>
                                    <div className="btnRightField">
                                        <ButtonGroup size="small" aria-label="small outlined button group">
                                            {
                                                board.boardId === "COMMUNITY_NOTICE" ? (
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
                                                )
                                            
                                            }
                                            {
                                                board.createUserId === login.loginUser.userId ? 
                                                    (
                                                        <Button color="secondary" onClick={handleContentDelete}>
                                                            삭제
                                                        </Button>
                                                    ):(
                                                        null
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
                                <TableCell colSpan={1}>제목</TableCell>
                                <TableCell colSpan={8}>
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
                                <TableCell colSpan={1}>작성자</TableCell>
                                <TableCell colSpan={1}>
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
            <Grid item xs={12}>
                <TableContainer>
                        <Table id="table" size="medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={10}>
                                        답글
                                    </TableCell>
                                    <TableCell colspan={2}>
                                            { isReply ?
                                                (
                                                    <div className="btnRightfield">
                                                        <Button 
                                                            className="btnRight" 
                                                            color="default" 
                                                            size="small"
                                                            onClick={handleReplyWrite}
                                                        >
                                                            취소
                                                        </Button>
                                                        <Button
                                                            className="btnRight" 
                                                            color="default" 
                                                            size="small"
                                                        >
                                                            작성
                                                        </Button>
                                                    </div>
                                                ):(
                                                    <div className="btnRightfield">
                                                        <Button 
                                                            className="btnRight" 
                                                            color="default" 
                                                            size="small"
                                                            startIcon={<CreateRoundedIcon />}
                                                            onClick={handleReplyWrite}
                                                        >
                                                            작성
                                                        </Button>
                                                    </div>
                                                )
                                            }
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={12}>
                                        <div className="editor">
                                            <Editor editorState={replyState} onChange={setReplyState} readOnly={ isReply ? false : true }/>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
        </Container>
    );
}