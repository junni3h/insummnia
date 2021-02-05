import { Button, ButtonGroup, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, TextField } from '@material-ui/core';
import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Editor, EditorState, convertToRaw } from 'draft-js';

import CommunityAPIRoute from '../../../router/libs/CommunityAPIRoute';

import 'draft-js/dist/Draft.css';
import '../../../css/common/common.css';


export default function CommunityWriteViewPage(props) {

    const login = useSelector(state => state.UserReducer);

    const boardId = props.match.params.boardId;
    const [board, setBoard] = useState({});
    const [boardUrl, setBoardUrl] = useState("");

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);
    
    async function fetchBoardById(){
        const params = {};
        params.boardId = boardId;

        const result = await CommunityAPIRoute.fetchBoardById(params);
        const data = result.data;

        setBoardUrl(data.boardUrl);
    }

    useEffect(() => {
        fetchBoardById();
    }, [boardId]);

    const handleChange = ( event ) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        setBoard({
            ...board,
            [name]: value
        })
    }

    const handleSubmit = ( event ) => {
        const params = board;
        params.boardId = boardId;
        params.boardContent = getContent();
        params.createUserId = login.loginUser.userId;
        console.log(params);

        if(window.confirm("게시글 작성을 완료하시겠습니까?")){
            CommunityAPIRoute.fetchWriteBoard(params)
                            .then( res => {
                                const data = res.data;

                                // 작성 성공 여부
                                if(data.success){
                                    // 성공시 페이지 이동
                                    if(window.confirm(data.message)){
                                        props.history.push(boardUrl);
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

    const goBackList = () => {
        props.history.push(boardUrl);
    }

    return(
        <Container className="container" component="main" maxWidth="lg" color="inherit">
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit} method="post">
                        <TableContainer>
                            <Table id="table" size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={12}>
                                            <div className="btnRightField">
                                                <ButtonGroup size="small" aria-label="small outlined button group">
                                                    <Button type="submit">
                                                        작성 완료
                                                    </Button>
                                                    <Button type="button" color="secondary" onClick={goBackList}>
                                                        작성 취소
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
                                                onChange={handleChange} 
                                                size="small" 
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                autoFocus={true}
                                                >
                                            </TextField>
                                        </TableCell>
                                        <TableCell colSpan={1}>작성자</TableCell>
                                        <TableCell colSpan={1}>
                                            <TextField 
                                                id="createUserName"
                                                name="createUserName"
                                                value={`${login.loginUser.nickNm} (${login.loginUser.userId})`} 
                                                size="small" 
                                                fullWidth
                                                disabled
                                            >
                                            </TextField>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={12}>
                                            <Editor editorState={editorState} onChange={setEditorState} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
}