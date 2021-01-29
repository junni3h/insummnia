import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import MainAPIRoute from '../../router/libs/MainAPIRoute';
import MenuAPIRoute from '../../router/libs/MenuAPIRoute';
import UserAPIRoute from '../../router/libs/UserAPIRoute';

import RootActions from '../../libs/reducer/RootActions';

import {AppBar, Container, List} from '@material-ui/core';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import LockRoundedIcon from '@material-ui/icons/LockRounded';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';

import '../../css/common/common.css';

export default function MenuLayout(){

    const [ menu, setMenu ] = useState([]);
    const [ children, setChildren ] = useState([]);
    const [ target, setTarget ] = useState(null);

    const login = useSelector(state => state.UserReducer);
    const dispatch = useDispatch();
    
    async function fetchData(){
        const result = await MainAPIRoute.fetchMainAPI();
        const data = result.data;

        console.log(data.test);

        setMenu(data.menu);
    }

    useEffect(() => {
        if(login.menu != null){
            setMenu(login.menu);
        } else {
            fetchData(); 
        }
    }, []);

    const handleMenuOpen = (event) => {
        setTarget(event.currentTarget);
        const menuId = event.currentTarget.getAttribute('data');

        MenuAPIRoute.fetchFindMenuItemByUpperId(menuId)
                    .then ( res => {
                        const data = res.data;
                        setChildren(data);
                    });
    };
    
    const handleMenuClose = () => {
        setTarget(null);
    };

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
            <AppBar position="static" color="transparent">
                <Container maxWidth="xl">
                    <List component="nav" aria-labelledby="main navigation">
                        <div className="leftMenu">
                            <div className="menuList">
                                <Link to="/" className="textLink">
                                    <IconButton size="small">
                                        <Typography className="main" variant="button">
                                            inssumnia
                                        </Typography>
                                    </IconButton>
                                </Link>
                            </div>
                            {
                                menu.map((item, index) => (
                                    <div className="menuList">
                                        <IconButton size="small" data={item.menuId} onClick={handleMenuOpen}>
                                            <Typography className="menuIcon">
                                                {item.menuNm}          
                                            </Typography>
                                        </IconButton>
                                        {
                                            children.length != 0 ?
                                            (
                                                <Menu
                                                    anchorEl={target}
                                                    keepMounted
                                                    open={Boolean(target)}
                                                    onClose={handleMenuClose}
                                                >
                                                    {
                                                        children.map((item, index) => (
                                                            <MenuItem onClick={handleMenuClose}>
                                                                <Link to={item.menuUrl}>
                                                                    <IconButton size="small">
                                                                        <Typography className="menuIcon">
                                                                            {item.menuNm}          
                                                                        </Typography>
                                                                    </IconButton>
                                                                </Link>
                                                            </MenuItem>
                                                        ))
                                                    }
                                                </Menu>
                                            ):(
                                                null
                                            )
                                        }
                                        
                                    </div>
                                ))
                            }
                        </div>
                        {login.isLogin ? (
                            <div className="rightMenu">
                                <div className="menuList">
                                    <Link to='/myInfo' className="textLink">
                                        <Tooltip title={login.loginUser.userNm}>
                                            <IconButton size="small">
                                                <AssignmentIndIcon className="userIcon" fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                </div>
                                <div className="menuList">
                                    <IconButton size="small">
                                        <Tooltip title="로그아웃">
                                            <LockRoundedIcon className="userIcon" fontSize="small" onClick={handleLogout}/>
                                        </Tooltip>
                                    </IconButton>
                                </div>
                            </div>
                        ):(
                            <div className="rightMenu">
                                <div className="menuList">
                                    <Tooltip title="로그인">
                                    <IconButton size="small">
                                        <Link to="/login" className="textLink">
                                            <LockOpenRoundedIcon className="userIcon" fontSize="small"/>
                                        </Link>
                                    </IconButton>
                                    </Tooltip>
                                </div>
                                <div className="menuList">
                                    <Tooltip title="회원가입">
                                        <IconButton size="small">
                                            <Link to="/regist" className="textLink">
                                                <PersonAddRoundedIcon className="userIcon" fontSize="small"/>
                                            </Link>
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>  
                        )}
                    </List>
                </Container>
            </AppBar>
            <div className="background">
            </div>
        </div>
    );   

}