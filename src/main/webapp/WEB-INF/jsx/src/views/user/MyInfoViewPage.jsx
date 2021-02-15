import { React, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserAPIRoute from '../../libs/router/UserAPIRoute';

import { Button, Container, TextField } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

import '../../css/common/common.css';

export default function MyInfoViewPage(props) {

    const login = useSelector(state => state.UserReducer);

    const [ user, setUser ] = useState({});
    const [ isUpdate, setIsUpdate ] = useState(false);

    async function fetchData(){
        const result = await UserAPIRoute.fetchUserInfo(login.loginUser.userId);
        const data = result.data;

        setUser(data);
    };

    useEffect(() => {
        if(login.loginUser != null){
            fetchData();
        }  
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

    if(login.isLogin) { 
        if(isUpdate) {
            return(
                <Container className="container" component="main" maxWidth="lg" color="inherit">
        
                    <div className="btnRightField">
                    <Button  type="submit" className="btnRight" variant="contained" color="primary" size="small" startIcon={<CheckCircleRoundedIcon />}>수정</Button>
                        <Button className="btnRight" variant="contained" color="secondary" size="small" onClick={handleIsUpdate} startIcon={<CancelRoundedIcon />}>취소</Button>
                    </div>
                    <form onSubmit={handleSubmit} method="post">
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TableContainer>
                                    <Table id="table" size="small">
                                        <TableHead className="tableHeader">
                                            <TableCell>아이디</TableCell>
                                            <TableCell>{login.loginUser.userId}</TableCell>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>이름</TableCell>
                                                <TableCell><TextField id="userNm" name="userNm" value={login.loginUser.userNm} onChange={handleChange} size="small"></TextField></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>비밀번호</TableCell>
                                                <TableCell><TextField type="password" id="password" name="password" value={login.loginUser.password} onChange={handleChange} size="small" required></TextField></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>별명</TableCell>
                                                <TableCell><TextField id="nickNm" name="nickNm" value={login.loginUser.nickNm} onChange={handleChange} size="small"></TextField></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>권한</TableCell>
                                                <TableCell>{login.loginUser.roleNm}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>등록일시</TableCell>
                                                <TableCell>{login.loginUser.recentLoginDatetime}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>접속일시</TableCell>
                                                <TableCell>{login.loginUser.createDatetime}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>수정자</TableCell>
                                                <TableCell>{login.loginUser.updateUserId}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>수정일시</TableCell>
                                                <TableCell>{login.loginUser.updateDatetime}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            );
        } else {
            return(
                <Container className="container" component="main" maxWidth="lg" color="inherit">
        
                    <div className="btnRightField">
                        <Button className="btnRight" variant="contained" color="primary" size="small" onClick={handleIsUpdate} startIcon={<UpdateRoundedIcon />}>수정</Button>
                    </div>
                    
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table id="table" size="small">
                                    <TableHead className="tableHeader">
                                        <TableCell>아이디</TableCell>
                                        <TableCell>{login.loginUser.userId}</TableCell>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>이름</TableCell>
                                            <TableCell>{login.loginUser.userNm}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>별명</TableCell>
                                            <TableCell>{login.loginUser.nickNm}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>권한</TableCell>
                                            <TableCell>{login.loginUser.roleNm}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>등록일시</TableCell>
                                            <TableCell>{login.loginUser.createDatetime}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>접속일시</TableCell>
                                            <TableCell>{login.loginUser.recentLoginDatetime}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>수정자</TableCell>
                                            <TableCell>{login.loginUser.updateUserId}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>수정일시</TableCell>
                                            <TableCell>{login.loginUser.updateDatetime}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Container>
            );
        }
    } else {
        return (
            <Redirect to='/error/auth'/>
        )
    }
    

}