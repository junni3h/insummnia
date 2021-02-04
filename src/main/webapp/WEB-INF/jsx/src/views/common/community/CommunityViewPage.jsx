import {React, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

import CommunityAPIRoute from '../../../router/libs/CommunityAPIRoute';

import '../../../css/common/common.css';
import '../../../css/common/commonTable.css';

import { DataGrid } from '@material-ui/data-grid';
import { Button, Container, Grid } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';

import CreateRoundedIcon from '@material-ui/icons/CreateRounded';

export default function CommunityViewPage({match}) {

    console.log(match);

    const login = useSelector(state => state.UserReducer);
    const [ board, setBoard ] = useState({});

    const columns = [
            {field: 'boardId',          hide: true}
        ,   {field: 'boardSeq',         headerName: '글번호'}
        ,   {field: 'boardTitle',       headerName: '글제목'}
        ,   {field: 'createUserId',     headerName: '작성자'}
        ,   {field: 'createDatetime',   headerName: '작성일'}
    ];

    const [ rows, setRows ] = useState([]);

    async function fetchBoardIdByUrl(){
        const params = {};
        params.boardUrl = match.path;

        const result = await CommunityAPIRoute.fetchBoardIdByUrl(params);
        const data = result.data;

        setBoard(data);
        match.params.boardId = data.boardId;
    }

    useEffect(() => {
        fetchBoardIdByUrl();
    }, [match.path]);

    if(login.isLogin){
        return(
            <Container className="container" component="main" maxWidth="lg" color="inherit">
                <div className="btnRightField">
                    <Link to={`/community/write/${board.boardId}`} className="textLink">
                        <Button 
                            className="btnRight" 
                            variant="contained" 
                            color="default" 
                            size="small" 
                            startIcon={<CreateRoundedIcon />}> 
                            작성하기
                        </Button>
                    </Link>
                </div>
                <Grid container className="gridContainer">
                    <DataGrid rows={rows} columns={columns}/>
                </Grid>
            </Container>
        );
    } else {
        return( <Redirect to="/error/auth"/> );
    }

}

