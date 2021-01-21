import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import UserAPIRoute from '../../router/libs/UserAPIRoute';

import {Button, Container, CssBaseline, TextField} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

import '../../css/common/common.css';
import '../../css/user/userRegistViewCss.css';

export default function UserRegistView (props) {

    // 유저정보
    const [ user, setUser ] = useState({
              userId: ''
            , password: ''
            , userNm: ''
            , nickNm: ''
    });

    const [ regist, setRegist ] = useState(false);

    // form 데이터 생성
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

    // form 데이터 전송
    const handleSubmit = (event) => {
        const params = user;

        UserAPIRoute.fetchRegistUsers(params)
            .then( res => {
                const data = res.data;
                
                if(data.regist){
                    if(window.confirm(data.message)){
                        setRegist(true);
                    }
                } else {
                    alert(data.message);
                }

            });
    
        event.preventDefault();
    }

    if(regist){
        return <Redirect to="/login" />
    } else {
        return(
            <Container className="bodyContainer" component="main" maxWidth="xs" color="inherit">
                <CssBaseline />
                <PersonAddRoundedIcon className="logo" fontSize="large"/>
                <form onSubmit={handleSubmit} method="post">
                    <div className="userBaiscField">
                        <TextField id="userId" name="userId" label="아이디" value={user.userId} onChange={handleChange}  margin="normal" fullWidth required></TextField>
                        <TextField type="password" id="password" name="password" label="비밀번호" value={user.password} onChange={handleChange} margin="normal" fullWidth required></TextField>
                    </div>
                    <Divider/>
                    <div className="userInfoField">
                        <TextField id="userNm" name="userNm" label="이름" value={user.userNm} onChange={handleChange} margin="normal" fullWidth></TextField>
                        <TextField id="nickNm" name="nickNm" label="별명" value={user.nickNm} onChange={handleChange} margin="normal" fullWidth></TextField>
                    </div>
                    <Divider className="divider"/>
                    <div className="buttonField">
                        <Button type="submit" className="btnVertical" variant="contained" color="primary" startIcon={<CheckCircleRoundedIcon />} fullWidth>가입완료</Button>
                        <Link to="/" className="textLink"><Button type="button" className="btnVertical" variant="contained" color="secondary" startIcon={<CancelRoundedIcon />} fullWidth>가입취소</Button></Link>
                    </div>
                </form>
            </Container>
        );
    }

};
