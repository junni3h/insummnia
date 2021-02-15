import {React, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

import CommunityAPIRoute from '../../../libs/router/CommunityAPIRoute';

import '../../../css/common/common.css';
import '../../../css/common/commonTable.css';

import { DataGrid } from '@material-ui/data-grid';
import { Button, ButtonGroup, Container, Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';

import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import PageviewRoundedIcon from '@material-ui/icons/PageviewRounded';

export default function CommunityListViewPage({match, history}) {

    const login = useSelector(state => state.UserReducer);
    const [ board, setBoard ] = useState({});

    const [ rows, setRows ] = useState([]);
    const columns = [
            {field: 'id',               hide: true}
        ,   {field: 'boardSeq',         headerName: '글번호',       width: 100}
        ,   {field: 'boardTitle',       headerName: '글제목',       width: 350}
        ,   {field: 'createUserNm',     headerName: '작성자',       width: 250}
        ,   {field: 'createDatetime',   headerName: '작성일',       width: 200}
        ,   {filed: 'boardHit',         headerName: '조회수',       width: 100}
        
    ];

    async function fetchBoardByUrl(){
        const params = {};
        params.boardUrl = match.path;

        const result = await CommunityAPIRoute.fetchBoardByUrl(params);
        const data = result.data;

        setBoard(data);
        fetchBoardContentById(data);
    }

    const fetchBoardContentById = (params) => {
        console.log(params);
        CommunityAPIRoute.fetchBoardContentById(params)
                         .then( res => {
                            const data = res.data;
                            const list = [];

                            data.forEach(function(item){
                                const row = {};
                                row.id = item.boardId + "_" + item.boardSeq;
                                row.boardId = item.boardId;
                                row.boardSeq = item.boardSeq;
                                row.boardTitle = item.boardTitle;
                                row.createUserNm = item.createUserNm;
                                row.createDatetime = item.createDatetime;
                                row.boardHit = item.boardHit;
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
        const params = board;
        fetchBoardContentById(params);
        event.preventDefault();
    }

    const goToWriteView = () => {
        history.push(match.path + "/write");
    }

    const goToContentView = (data) => {
        const seq = data.row.boardSeq;
        history.push(match.path + "/view/" + seq);
    }

    if(login.isLogin){
        return(
            <Container className="container" component="main" maxWidth="lg" color="inherit">
                <Grid container className="gridContainer">
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table id="table" size="small">
                                <TableHead>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={3}>
                                            <TextField 
                                                id="boardTitle"
                                                name="boardTitle"
                                                label="글제목"
                                                size="small"
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                autoFocus={true}
                                                >
                                            </TextField>
                                        </TableCell>
                                        <TableCell colSpan={3}>
                                            <TextField 
                                                id="createUserNm"
                                                name="createUserNm"
                                                label="작성자"
                                                size="small"
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                >
                                            </TextField>
                                        </TableCell>
                                        <TableCell colSpan={2}>
                                            <TextField 
                                                id="startedOn"
                                                name="startedOn"
                                                className="datefield"
                                                type="date"
                                                label="작성일(시작일)"
                                                size="small"
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                >
                                            </TextField>
                                        </TableCell>
                                        <TableCell colSpan={2}>
                                            <TextField 
                                                id="endedOn"
                                                name="endedOn"
                                                type="date"
                                                label="작성일(종료일)"
                                                size="small"
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                >
                                            </TextField>
                                        </TableCell>
                                        <TableCell colSpan={2}>
                                            <div className="btnRightField">
                                                <Button 
                                                    className="btnRight" 
                                                    color="default" 
                                                    size="small"
                                                    onClick={handleSearch}
                                                    startIcon={<PageviewRoundedIcon />}
                                                > 
                                                    검색
                                                </Button>
                                                {
                                                    board.boardId === "COMMUNITY_NOTICE" ? (
                                                        login.loginUser.roleId === "ROLE_ADMIN" ? (
                                                            <Button 
                                                                className="btnRight" 
                                                                color="default" 
                                                                size="small" 
                                                                startIcon={<CreateRoundedIcon />}
                                                                onClick={goToWriteView}> 
                                                                작성
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
                                                            작성
                                                        </Button>
                                                    )
                                                }
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Grid container className="dataGridContainer">
                    <DataGrid 
                        rows={rows} 
                        columns={columns} 
                        rowHeight={30}
                        onRowClick={goToContentView}
                        checkboxSelection={login.loginUser.roleId === "ROLE_ADMIN" ? true : false}
                    />
                </Grid>
            </Container>
        );
    } else {
        return( <Redirect to="/error/auth"/> );
    }

}

