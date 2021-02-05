import {React, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

import CommunityAPIRoute from '../../../router/libs/CommunityAPIRoute';

import '../../../css/common/common.css';
import '../../../css/common/commonTable.css';

import { DataGrid } from '@material-ui/data-grid';
import { Button, Container, Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';

import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import PageviewRoundedIcon from '@material-ui/icons/PageviewRounded';

export default function CommunityViewPage({match, history}) {

    const login = useSelector(state => state.UserReducer);
    const [ board, setBoard ] = useState({});

    const [ rows, setRows ] = useState([]);
    const columns = [
            {field: 'id',               hide: true}
        ,   {field: 'boardId',          hide: true}
        ,   {field: 'boardSeq',         headerName: '글번호',       width: 100}
        ,   {field: 'boardTitle',       headerName: '글제목',       width: 500}
        ,   {field: 'createUserId',     headerName: '작성자',       width: 300}
        ,   {field: 'createDatetime',   headerName: '작성일',       width: 300}
        
    ];

    async function fetchBoardByUrl(){
        const params = {};
        params.boardUrl = match.path;

        const result = await CommunityAPIRoute.fetchBoardByUrl(params);
        const data = result.data;

        setBoard(data);
        fetchBoardContentById(data);
    }

    const fetchBoardContentById = (boardData) => {
        CommunityAPIRoute.fetchBoardContentById(boardData)
                         .then( res => {
                            const data = res.data;
                            const list = [];

                            data.forEach(function(item){
                                const row = {};
                                row.id = item.boardId + "_" + item.boardSeq;
                                row.boardId = item.boardId;
                                row.boardSeq = item.boardSeq;
                                row.boardTitle = item.boardTitle;
                                row.createUserId = item.createUserId;
                                row.createDatetime = item.createDatetime;
                                list.push(row);
                            });

                            console.log(list);

                            setRows(list);
                         });

    }

    useEffect(() => {
        fetchBoardByUrl();
    }, [match.path]);

    const handleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        setBoard({
            ...board,
            [name]: value
        });
    }

    const handleSearch = (event) => {
        fetchBoardByUrl();
        event.preventDefault();
    }

    const goToWriteView = () => {
        console.log("button Click");
        history.push("/community/write/" + board.boardId);
    }

    if(login.isLogin){
        return(
            <Container className="container" component="main" maxWidth="lg" color="inherit">
                <div className="btnRightField">
                    {
                        board.boardId === "COMMUNITY_NOTICE" ? (
                            login.loginUser.roleId === "ROLE_ADMIN" ? (
                                <Button 
                                    className="btnRight" 
                                    color="default" 
                                    size="small" 
                                    startIcon={<CreateRoundedIcon />}
                                    onClick={goToWriteView}> 
                                    공지 작성
                                </Button>
                            ) : (
                                null
                            )

                        ) : (
                            <Button 
                                className="btnRight" 
                                color="default" 
                                size="small" 
                                startIcon={<CreateRoundedIcon />}
                                onClick={goToWriteView}> 
                                게시글 작성
                            </Button>
                        )
                       
                    }
                </div>
                <Grid container className="gridContainer">
                    <Grid item xs={6}>
                        <TableContainer>
                            <Table id="table" size="small">
                                <TableHead>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={1}>
                                            <Select
                                                native
                                                onChange={handleChange}
                                                inputProps={{
                                                    name: "searchCol"
                                                }}
                                            >
                                                <option value="boardTitle" selected>제목</option>
                                                <option value="createUserName">작성자</option>
                                            </Select>
                                        </TableCell>
                                        <TableCell colSpan={4}>
                                            <TextField 
                                                id="boardTitle"
                                                name="boardTitle"
                                                size="small"
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                autoFocus={true}
                                                >
                                            </TextField>
                                        </TableCell>
                                        <TableCell colSpan={0}>
                                            <Button 
                                                className="btnRight" 
                                                color="default" 
                                                size="small"
                                                onClick={handleSearch}
                                                startIcon={<PageviewRoundedIcon />}
                                            > 
                                                검색
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Grid container className="dataGridContainer">
                    <DataGrid rows={rows} columns={columns} rowHeight={30} />
                </Grid>
            </Container>
        );
    } else {
        return( <Redirect to="/error/auth"/> );
    }

}

