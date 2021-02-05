import {React, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

import CommunityAPIRoute from '../../../router/libs/CommunityAPIRoute';

import '../../../css/common/common.css';
import '../../../css/common/commonTable.css';

import { DataGrid } from '@material-ui/data-grid';
import { Button, Container, Grid } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';

import CreateRoundedIcon from '@material-ui/icons/CreateRounded';

export default function CommunityViewPage({match, history}) {

    const login = useSelector(state => state.UserReducer);
    const [ board, setBoard ] = useState({});

    console.log(login);

    const columns = [
            {field: 'id',               hide: true}
        ,   {field: 'boardId',          hide: true}
        ,   {field: 'boardSeq',         headerName: '글번호',       width: 100}
        ,   {field: 'boardTitle',       headerName: '글제목',       width: 500}
        ,   {field: 'createUserId',     headerName: '작성자',       width: 300}
        ,   {field: 'createDatetime',   headerName: '작성일',       width: 300}
        
    ];
    const [ rows, setRows ] = useState([]);

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
                <Grid container className="dataGridContainer">
                    <DataGrid rows={rows} columns={columns} rowHeight={30} />
                </Grid>
            </Container>
        );
    } else {
        return( <Redirect to="/error/auth"/> );
    }

}

