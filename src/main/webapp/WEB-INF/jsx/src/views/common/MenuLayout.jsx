import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import UserAPIRoute from '../../router/libs/UserAPIRoute';
import RootActions from '../../libs/reducer/RootActions';

import {AppBar, Container, List} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

import {Home} from '@material-ui/icons';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import SettingsApplicationsRoundedIcon from '@material-ui/icons/SettingsApplicationsRounded';
import LocalCafeRoundedIcon from '@material-ui/icons/LocalCafeRounded';

import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';

import '../../css/common/common.css';
import background from '../../images/background.jpg';

export default function MenuLayout(){

    const login = useSelector(state => state.UserReducer);
    const dispatch = useDispatch();

    console.log(login);
    
    const handleLogout = (event) => {
        UserAPIRoute.fetchUserLogout()
                    .then(res => {
                        const data = res.data;

                        if(data.isLogout){
                            if(window.confirm(data.message)){
                                dispatch(
                                    RootActions.UserReducerAction.logout(
                                        {
                                              isRegist: false
                                            , isLogin: false
                                        }
                                    )
                                );
                            }
                        } else {
                            alert(data.message);
                        }
                    });
    }

    return(
        <div>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <List component="nav" aria-labelledby="main navigation">
                        <div className="leftMenu">
                            <div className="menuList">
                                <Link to="/" className="textLink">
                                    <Home className="menuIcon" fontSize="small"/>
                                    <Typography variant="button">
                                        Home
                                    </Typography>
                                </Link>
                            </div>
                            <div className="menuList">
                                <AssignmentIndRoundedIcon className="menuIcon" fontSize="small"/>
                                <Typography variant="button">
                                    Profile
                                </Typography>
                            </div>
                            <div className="menuList">
                                <Link to="/admin/user/list" className="textLink">
                                    <SettingsApplicationsRoundedIcon className="menuIcon" fontSize="small"/>
                                    <Typography variant="button">
                                        User
                                    </Typography>
                                </Link>
                            </div>
                            <div className="menuList">
                                <LocalCafeRoundedIcon className="menuIcon" fontSize="small"/>
                                <Typography variant="button">
                                    Community
                                </Typography>
                            </div>
                        </div>
                        {login.isLogin ? (
                            <div className="rightMenu">
                                <div className="menuList">
                                    <Tooltip title="로그아웃">
                                        <LockRoundedIcon className="userIcon" fontSize="small" onClick={handleLogout}/>
                                    </Tooltip>
                                </div>
                            </div>
                        ):(
                            <div className="rightMenu">
                                <div className="menuList">
                                    <Tooltip title="로그인">
                                        <Link to="/login" className="textLink"><LockOpenRoundedIcon className="userIcon" fontSize="small"/></Link>
                                    </Tooltip>
                                </div>
                                <div className="menuList">
                                    <Tooltip title="회원가입">
                                        <Link to="/regist" className="textLink"><PersonAddRoundedIcon className="userIcon" fontSize="small"/></Link>
                                    </Tooltip>
                                </div>
                            </div>  
                        )}
                    </List>
                </Container>
            </AppBar>
            <div className='background'>
                <img className="backgroundImages" src={background}/>
            </div>
        </div>              
    );   

}