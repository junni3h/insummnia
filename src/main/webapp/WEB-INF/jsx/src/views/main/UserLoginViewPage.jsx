import {React, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import UserAPIRoute from '../../router/libs/UserAPIRoute';
import RootActions from '../../libs/reducer/RootActions';

import {Button, Container, TextField, Typography} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';

import '../../css/common/common.css';

export default function UserLoginViewPage(){

    const login = useSelector(state => state.UserReducer);
    const dispatch = useDispatch();

    const [ user, setUser ] = useState({
            userId: ''
        ,   password: ''
    });

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
                        console.log(data);
                        dispatch(
                            RootActions.UserReducerAction.login(
                                {
                                      isRegist: false
                                    , isLogin: true
                                    , loginUser: data.loginUser
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

    if(login.isLogin) {

        return(
            <Redirect to="/"/>
        );

    } else {

        return(
            <Container className="bodyContainer" component="main" maxWidth="xs">
                <Typography className="logo" align="center">
                    inssumnia
                </Typography>
                <form onSubmit={handleLogin} method="post">
                    <div className="loginField">
                        <TextField 
                            id="userId" 
                            name="userId" 
                            label="E-Mail" 
                            value={user.userId} 
                            onChange={handleChange} 
                            margin="normal" 
                            InputProps={
                                {startAdornment:
                                    (<InputAdornment position="start">
                                        <AccountCircleRoundedIcon />
                                    </InputAdornment>)
                                }
                            }
                            fullWidth 
                            required
                            >
                        </TextField>
                        <TextField 
                            type="password" 
                            id="passWord" 
                            name="password" 
                            label="Password" 
                            value={user.password} 
                            onChange={handleChange} 
                            margin="normal" 
                            InputProps={
                                {startAdornment:
                                    (<InputAdornment position="start">
                                        <AccountCircleRoundedIcon />
                                    </InputAdornment>)
                                }
                            }
                            fullWidth 
                            required>
                        </TextField>
                    </div>
                    <div className="buttonField">
                        <Button 
                            type="submit" 
                            className="btnVertical" 
                            margin="normal"
                            variant="contained"
                            color="primary"
                            fullWidth
                            startIcon={<PersonRoundedIcon />}
                        >
                            Sign In
                        </Button>
                        <Link to="/regist" className="textLink">
                            <Button 
                                type="button" 
                                className="btnVertical" 
                                variant="contained"
                                color="primary" 
                                margin="normal" 
                                startIcon={<PersonAddRoundedIcon />}
                                fullWidth
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </form>
            </Container>
        );

    }

}