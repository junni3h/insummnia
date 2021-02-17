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
            , repeatPassword: ''
            , userNm: ''
            , nickNm: ''
    });

    // 사용자 아이디 유효성(중복/형식) 체크 플래그
    const [ idValidation, setIdValidation ] = useState(false);
    // 사용자 아이디 유효성 체크 플래그에 따른 메시지
    const [ idMessage, setIdMessage ] = useState("");

    const [ nickValidation, setNickValidation ] = useState(false);
    const [ nickHandleMessage, setNickHandleMessage ] = useState("");

    // 비밀번호 자리수 유효성 체크 플래그
    const [ pwdValidation, setPwdValidation ] = useState(false);
    // 비밀번호 자리수 유효성 체크 플래그에 따른 메시지
    const [ pwdMessage, setPwdMessage ] = useState("");
    // 비밀번호 일치 유효성 체크 플래그
    const [ repeatValidation, setRepeatValidation ] = useState(false);
    // 비밀번호 일치 유효성 체크 플래그에 따른 메시지
    const [ repeatMessage, setRepeatMessage ] = useState("");

    // 전체 유효성 체크 플래그
    const [ validation, setValidation ] = useState(false);

    const regist = useSelector(state => state.UserReducer);
    const dispatch = useDispatch();

    // form 데이터 생성
    const handleInputChange = ( event ) => {
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

    // 사용자 아이디 유효성 검사 이벤트 
    const handleUserIdValidationCheck = ( event ) => {
        // 사용자 아이디 양식
        const form = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        // textField에 입력된 사용자 아이디
        const userId = event.target.value;

        // 사용자 아이디 공백 여부 체크
        if(userId !== null && userId !== ""){
            // 사용자 아이디가 공백이 아닐 경우
            // 사용자 아이디와 아이디 양식을 비교
            if(form.test(userId)){
                // 양식이 일치 할 경우
                setIdValidation(false);
                setIdMessage("올바른 이메일 형식 입니다!");
                handleUserDuplicationCheck(event, userId);
            } else {
                // 양식이 일치하지 않을 경우
                setIdValidation(true);
                setIdMessage("이메일 형식이 잘못되었습니다!");
            }
        } else {
            // 사용자 아이디 공백일 경우
            setIdValidation(false);
            setIdMessage("");
        }

        setUser(
            {
                ...user
                , [event.target.name] : userId
            }
        )
    }

    // 사용자 아이디 중복 검사 체크 이벤트
    const handleUserDuplicationCheck = ( event, userId ) => {
        // 사용자 아이디 공백 체크 여부
        if(userId !== "" && userId !== null){
            // 사용자 아이디가 공백이 아닐 경우 중복 검사 체크 API 호출
            UserAPIRoute.fetchUserDuplicationById( userId )
            .then( res => {
                // TextField 에러 메시지 이벤트 호출
                handleInputErrorCheck("duplication", res.data);
            });
        } else {
            // 사용자 아이디가 공백일 경우 Message 호출
            setIdValidation(false);
            setIdMessage("아이디가 공백입니다!");
        }
        
        event.preventDefault();
    }

    const handlePasswordValidationCheck = ( event ) => {
        const password = event.target.value;

        const num = password.search(/[0-9]/g);
        const eng = password.search(/[a-z]/ig);
        const spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
        const length = password.length;

        if(length < 8 && length > 0){
            setPwdValidation(true);
            setPwdMessage("비밀번호는 8자 이상입니다!");
        } else if(num < 0 || eng < 0 || spe < 0) {
            setPwdValidation(true);
            setPwdMessage("비밀번호는 영문,숫자,특수문자 혼합입니다!");
        } else {
            setPwdValidation(false);
            setPwdMessage("");
        }

        setUser({
                ...user
            ,   [event.target.name]: password
        });
    }

    // 패스워드 유효성 검사 이벤트
    const handlePwdRepeatValidationCheck = ( event ) => {

        // 사용자가 입력한 패스워드
        const password = user.password;
        // 사용자가 재입력한 패스워드(확인용)
        const repeat = event.target.value;

        // 기존에 입력한 패스워드 공백 여부
        if(password !== "" && password !== null){
            // 재입력한 패스워드 공백 여부
            if(repeat !== "" & repeat !== null){
                // 재입력한 패스워드가 공백이 아닐 경우
                // 기존 입력한 패스워드와 확인차 재입력한 패스워드가 일치할 경우
                if(password === repeat){
                    handleInputErrorCheck('password', false);
                } else {
                    // 기존 입력한 패스워드와 재입력한 패스워드가 일치하지 않을 경우
                    handleInputErrorCheck('password', true);
                }
            } else {
                // 재입력한 패스워드가 공백일 경우
                repeatValidation(false);
                setRepeatMessage("");
            }
        } else {
            // 기존에 입력한 패스워드가 공백일 경우
            repeatValidation(true);
            setRepeatMessage("비밀번호를 먼저 입력하세요!");
        }

    }

    const handleNickNameValidation = ( event ) => {
        const nickNm = event.target.value;
        console.log(nickNm);
        // 사용자 아이디 공백 체크 여부
        if(nickNm !== "" && nickNm !== null){
            // 사용자 아이디가 공백이 아닐 경우 중복 검사 체크 API 호출
            UserAPIRoute.fetchUserDuplicationByNickName( nickNm )
            .then( res => {
                // TextField 에러 메시지 이벤트 호출
                handleInputErrorCheck("nickName", res.data);
            });
        }

        setUser({
                ...user
            ,   [event.target.name] : nickNm
        });
    }

    const handleInputErrorCheck = ( type, value ) => {

        switch(type){
            case "duplication" :
                // 사용자 아이디 중복 여부
                if(value){
                    // 사용자 아이디가 중복일 경우
                    setIdValidation(value);
                    setIdMessage("사용 중인 아이디 입니다!");
                } else {
                    // 사용자 아이디가 중복이 아닐 경우
                    setIdValidation(value);
                    setIdMessage("아이디를 사용해도됩니다!");
                }
            break;
            case "password" :
                // 패스워드 유효성 여부
                if(value){
                    // 두 패스워드가 일치하지 않는 경우
                    setRepeatValidation(value);
                    setRepeatMessage("비밀번호가 일치하지 않습니다!");
                } else {
                    // 두 패스워드가 일치하는 경우
                    setRepeatValidation(value);
                    setRepeatMessage("비밀번호가 일치합니다!");
                }
            break;
            case "nickName" :
                // 사용자 별명 중복 여부
                if(value){
                    // 사용자 별명이 중복된 경우
                    setNickValidation(value);
                    setNickHandleMessage("사용 중인 별명입니다!");
                } else {
                    // 사용자 별명이 중복이 아닐 경우
                    setNickValidation(value);
                    setNickHandleMessage("별명을 사용해도됩니다!");
                }
            break;
            default:
            break;
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
                <Typography className="logo" align="center">
                    inssumnia
                </Typography>
                <form onSubmit={handleSubmit} method="post">
                    <TableContainer component="div">
                        <Table size="medium">
                            <TableBody>
                                <TableRow>
                                    <TableCell colspan={6}>
                                        <TextField
                                            id="userId" 
                                            name="userId" 
                                            label="아이디" 
                                            onChange={handleUserIdValidationCheck}  
                                            error={ idValidation ? true : false }
                                            helperText={ idValidation ? idMessage : idMessage }
                                            InputProps={
                                            {startAdornment:
                                                (<InputAdornment position="start">
                                                    <AccountCircleRoundedIcon />
                                                </InputAdornment>)
                                            }}
                                            margin="normal"
                                            size="medium"
                                            fullWidth 
                                            required
                                        >
                                        </TextField>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <TextField 
                                            type="password" 
                                            id="password" 
                                            name="password" 
                                            label="비밀번호" 
                                            onChange={handlePasswordValidationCheck} 
                                            error={pwdValidation ? true : false}
                                            helperText={pwdValidation ? pwdMessage : pwdMessage}
                                            margin="normal" 
                                            InputProps={
                                                {startAdornment:
                                                    (<InputAdornment position="start">
                                                        <AccountCircleRoundedIcon />
                                                    </InputAdornment>)
                                                }}
                                            fullWidth 
                                            required>
                                        </TextField>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <TextField 
                                            type="password" 
                                            id="repeatPassword" 
                                            name="repeatPassword" 
                                            label="비밀번호 재입력" 
                                            onChange={handlePwdRepeatValidationCheck}
                                            error={repeatValidation ? true : false}
                                            helperText={repeatValidation ? repeatMessage : repeatMessage}
                                            InputProps={
                                                {startAdornment:
                                                    (<InputAdornment position="start">
                                                        <AccountCircleRoundedIcon />
                                                    </InputAdornment>)
                                                }}
                                            margin="normal"
                                            fullWidth
                                            required>
                                        </TextField>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer component="div">
                            <Table size="medium">
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={6}>
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
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <TextField 
                                                id="nickNm" 
                                                name="nickNm" 
                                                label="별명" 
                                                value={user.nickNm}
                                                onChange={handleNickNameValidation}
                                                error={nickValidation ? true : false}
                                                helperText={nickValidation ? nickHandleMessage : nickHandleMessage} 
                                                margin="normal" 
                                                InputProps={
                                                    {startAdornment:
                                                        (<InputAdornment position="start">
                                                            <AccountCircleRoundedIcon />
                                                        </InputAdornment>)
                                                    }}
                                                fullWidth>
                                            </TextField>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                    </TableContainer>
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
