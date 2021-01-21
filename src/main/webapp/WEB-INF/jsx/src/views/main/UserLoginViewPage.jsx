import {React, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';

import UserAPIRoute from '../../router/libs/UserAPIRoute';

import {Button, Container, TextField} from '@material-ui/core';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';

import '../../css/common/common.css';

export default function UserLoginViewPage(props){

    const [ user, setUser ] = useState({
            userId: ''
        ,   password: ''
    });

    const [ isLogin, setIsLogin ] = useState(false);
    const [ isLogout, SetIsLogout ] = useState(true);

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

    const handleLogin = (event) => {
        const params = user;

        UserAPIRoute.fetchUserLogin(params)
            .then( res => {
                const data = res.data;
                
                if(data.isLogin){
                    if(window.confirm(data.message)){
                        setIsLogin(data.isLogin);
                    }
                } else {
                    alert(data.message);
                }

            });
    
        event.preventDefault();
    }

    if(isLogin) {

        return(
            <Redirect to="/"/>
        );

    } else {

        return(
            <Container className="bodyContainer" component="main" maxWidth="xs">
                <form onSubmit={handleLogin} method="post">
                    <div className="loginField">
                        <TextField id="userId" name="userId" label="아이디" value={user.userId} onChange={handleChange} variant="outlined" margin="normal" fullWidth required></TextField>
                        <TextField type="password" id="passWord" name="password" label="비밀번호" value={user.password} onChange={handleChange} variant="outlined" margin="normal" fullWidth required></TextField>
                    </div>
                    <div className="buttonField">
                        <Button type="submit" className="btnVertical" variant="contained" color="primary" margin="normal" fullWidth><PersonRoundedIcon fontSize="small"/>로그인</Button>
                        <Link to="/regist" className="textLink"><Button type="button" className="btnVertical" variant="contained" color="primary" className="regist" margin="normal" fullWidth><PersonAddRoundedIcon fontSize="small"/>회원가입</Button></Link>
                    </div>
                </form>
            </Container>
        );

    }

}