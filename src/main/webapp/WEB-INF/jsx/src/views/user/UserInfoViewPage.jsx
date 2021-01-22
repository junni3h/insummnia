import { React, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import UserAPIRoute from '../../router/libs/UserAPIRoute';

import { Button, Container, TextField } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import BackspaceRoundedIcon from '@material-ui/icons/BackspaceRounded';
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

import '../../css/common/common.css';

export default function UserInfoViewPage(props) {

    const { userId } = props.match.params;
    const [ user, setUser ] = useState({});

    const [ isUpdate, setIsUpdate ] = useState(false);

    async function fetchData(){
        const result = await UserAPIRoute.fetchUserInfo(userId);
        const data = result.data;

        setUser(data);
    };

    useEffect(() => {
        fetchData();
    },[]);

    const handleIsUpdate = (event) =>
    {
        if(isUpdate){
            setIsUpdate(false);
        } else {
            setIsUpdate(true);
        }
        
        event.preventDefault();
    }

    const handleChange = (event) => {

        const target = event.target;
        const value  = target.value;
        const name   = target.name;

        setUser(
            {   
                ...user
              , [name]: value
            }
        );
    }

    const handleSubmit = (event) => {
        const params = user;
        console.log("submit==>", params);

        UserAPIRoute.fetchUpdateUsers(params)
                    .then( res => {
                        const data = res.data;

                        if(data.update){
                            if(window.confirm(data.message)){
                                setIsUpdate(false);
                                fetchData();
                            }
                        } else {
                            alert(data.message);
                        }
                    });

        event.preventDefault();
    }

    if(isUpdate) {
        return(
            <Container className="container" component="main" maxWidth="lg" color="inherit">
    
                <div className="btnRightField">
                    <Link to="/admin/user/list" className="textLink">
                        <Button className="btnRight" variant="contained" color="inherit" size="small" startIcon={<BackspaceRoundedIcon />}>목록</Button>
                    </Link>
                    <Button className="btnRight" variant="contained" color="secondary" size="small" onClick={handleIsUpdate} startIcon={<CancelRoundedIcon />}>취소</Button>
                    <Button className="btnRight" variant="contained" color="secondary" size="small" startIcon={<DeleteForeverRoundedIcon />}>삭제</Button>
                </div>
                <form onSubmit={handleSubmit} method="post">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table id="table" size="small">
                                    <TableHead className="tableHeader">
                                        <TableCell>아이디</TableCell>
                                        <TableCell>{user.userId}</TableCell>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>이름</TableCell>
                                            <TableCell><TextField id="userNm" name="userNm" value={user.userNm} onChange={handleChange} size="small"></TextField></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>비밀번호</TableCell>
                                            <TableCell><TextField type="password" id="password" name="password" value={user.password} onChange={handleChange} size="small" required></TextField></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>별명</TableCell>
                                            <TableCell><TextField id="nickNm" name="nickNm" value={user.nickNm} onChange={handleChange} size="small"></TextField></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>등록일</TableCell>
                                            <TableCell>{user.createDatetime}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>수정자</TableCell>
                                            <TableCell>{user.updateUserId}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>수정일</TableCell>
                                            <TableCell>{user.updateDatetime}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                
                    <div className="btnRightField">
                        <Button  type="submit" className="btnRight" variant="contained" color="primary" size="small" startIcon={<CheckCircleRoundedIcon />}>수정</Button>
                    </div>
                </form>
            </Container>
        );
    } else {
        return(
            <Container className="container" component="main" maxWidth="lg" color="inherit">
    
                <div className="btnRightField">
                    <Link to="/admin/user/list" className="textLink">
                        <Button className="btnRight" variant="contained" color="inherit" size="small" startIcon={<BackspaceRoundedIcon />}>목록</Button>
                    </Link>
                    <Button className="btnRight" variant="contained" color="primary" size="small" onClick={handleIsUpdate} startIcon={<UpdateRoundedIcon />}>수정</Button>
                    <Button className="btnRight" variant="contained" color="secondary" size="small" startIcon={<DeleteForeverRoundedIcon />}>삭제</Button>
                </div>
                
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table id="table" size="small">
                                <TableHead className="tableHeader">
                                    <TableCell>아이디</TableCell>
                                    <TableCell>{user.userId}</TableCell>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>이름</TableCell>
                                        <TableCell>{user.userNm}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>별명</TableCell>
                                        <TableCell>{user.nickNm}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>등록일</TableCell>
                                        <TableCell>{user.createDatetime}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>수정자</TableCell>
                                        <TableCell>{user.updateUserId}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>수정일</TableCell>
                                        <TableCell>{user.updateDatetime}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Container>
        );
    }

}