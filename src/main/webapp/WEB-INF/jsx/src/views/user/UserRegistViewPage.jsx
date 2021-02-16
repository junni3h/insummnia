import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import UserAPIRoute from '../../libs/router/UserAPIRoute';
import RootActions from '../../libs/reducer/RootActions';

import {Button, Container, CssBaseline, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import InputAdornment from '@material-ui/core/InputAdornment';

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

import AssignmentTurnedInRoundedIcon from '@material-ui/icons/AssignmentTurnedInRounded';

import '../../css/common/common.css';

export default function UserRegistView () {

    // 유저정보
    const [ user, setUser ] = useState({
              userId: ''
            , password: ''
            , userNm: ''
            , nickNm: ''
    });

    const [ duplication, setDuplication ] = useState(false);
    const [ message, setMessage ] = useState("");

    const regist = useSelector(state => state.UserReducer);
    const dispatch = useDispatch();

    // form 데이터 생성
    const handleInputChange = (event) => {
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

    // 사용자 아이디 중복 검사 체크 이벤트
    const handleUserDuplicationCheck = ( event ) => {
        const userId = user.userId;
        
        // 사용자 아이디 공백 체크 여부
        if(userId != "" && userId != null){
            // 사용자 아이디가 공백이 아닐 경우 중복 검사 체크 API 호출
            UserAPIRoute.fetchUserDuplicationById( userId )
            .then( res => {
                // TextField 에러 메시지 이벤트 호출
                handleInputErrorCheck(res.data);
            });
        } else {
            // 사용자 아이디가 공백일 경우 Message 호출
            setDuplication(false);
            setMessage("아이디가 공백입니다!");
        }
        
        event.preventDefault();
    }

    const handleInputErrorCheck = ( duplication ) => {
        // 사용자 아이디 중복 여부
        if(duplication){
            // 사용자 아이디가 중복일 경우
            setDuplication(true);
            setMessage("아이디가 중복되었습니다!");
        } else {
            // 사용자 아이디가 중복이 아닐 경우
            setDuplication(false);
            setMessage("아이디를 사용해도됩니다!");
        }

    }

    // form 데이터 전송
    const handleSubmit = (event) => {
        const params = user;

        UserAPIRoute.fetchRegistUsers(params)
            .then( res => {
                const data = res.data;
                
                if(data.regist){
                    if(window.confirm(data.message)){
                        dispatch(
                            RootActions.UserReducerAction.regist(
                                {
                                      isRegist: true
                                }
                            )
                        );
                    }
                } else {
                    alert(data.message);
                }

            });

        event.preventDefault();
    }

    if(!regist.isRegist){
        return(
            <Container className="bodyContainer" component="main" maxWidth="xs" color="inherit">
                <CssBaseline />
                <Typography className="logo" align="center">
                    inssumnia
                </Typography>
                <form onSubmit={handleSubmit} method="post">
                    <div className="userBaiscField">
                        <TableContainer>
                            <Table>
                                <TableHead>

                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell colspan={5}>
                                            <TextField 
                                                id="userId" 
                                                name="userId" 
                                                label="아이디" 
                                                value={user.userId} 
                                                onChange={handleInputChange}  
                                                margin="normal"
                                                helperText={ duplication ? message : message }
                                                InputProps={
                                                {startAdornment:
                                                    (<InputAdornment position="start">
                                                        <AccountCircleRoundedIcon />
                                                    </InputAdornment>)
                                                }}
                                                fullWidth required>
                                            </TextField>
                                            </TableCell>
                                            <TableCell colspan={1}>
                                            <div className="btnRightField">
                                                <Button
                                                    className="btnRight"
                                                    size="small"
                                                    onClick={handleUserDuplicationCheck}
                                                    startIcon={<AssignmentTurnedInRoundedIcon/>}
                                                >
                                                    중복 검사
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        
                        <TextField 
                            type="password" 
                            id="password" 
                            name="password" 
                            label="비밀번호" 
                            value={user.password}
                            onChange={handleInputChange} 
                            margin="normal" 
                            InputProps={
                                {startAdornment:
                                    (<InputAdornment position="start">
                                        <AccountCircleRoundedIcon />
                                    </InputAdornment>)
                                }}
                            fullWidth required>
                        </TextField>
                    </div>
                    <Divider/>
                    <div className="userInfoField">
                        <TextField 
                            id="userNm" 
                            name="userNm" 
                            label="이름" 
                            value={user.userNm}
                            onChange={handleInputChange} 
                            margin="normal" 
                            InputProps={
                                {startAdornment:
                                    (<InputAdornment position="start">
                                        <AccountCircleRoundedIcon />
                                    </InputAdornment>)
                                }}
                            fullWidth>
                        </TextField>
                        <TextField 
                            id="nickNm" 
                            name="nickNm" 
                            label="별명" 
                            value={user.nickNm}
                            onChange={handleInputChange} 
                            margin="normal" 
                            InputProps={
                                {startAdornment:
                                    (<InputAdornment position="start">
                                        <AccountCircleRoundedIcon />
                                    </InputAdornment>)
                                }}
                            fullWidth>
                        </TextField>
                    </div>
                    <Divider className="divider"/>
                    <div className="buttonField">
                        <Button type="submit" className="btnVertical" variant="contained" color="primary" startIcon={<CheckCircleRoundedIcon />} fullWidth>가입완료</Button>
                        <Link to="/" className="textLink"><Button type="button" className="btnVertical" variant="contained" color="secondary" startIcon={<CancelRoundedIcon />} fullWidth>가입취소</Button></Link>
                    </div>
                </form>
            </Container>
        );
    } else {
        return (
            <Redirect to="/login"></Redirect>
        );
    }

};
