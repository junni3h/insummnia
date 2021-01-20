import React from 'react';
import {Link} from 'react-router-dom';

import {AppBar, Container, List} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

import {Home} from '@material-ui/icons';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import SettingsApplicationsRoundedIcon from '@material-ui/icons/SettingsApplicationsRounded';

import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';

import '../../css/common/common.css';
import background from '../../images/background.jpg';

export default function MenuLayout(){

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
                                        Admin
                                    </Typography>
                                </Link>
                            </div>
                        </div>
                        <div className="rightMenu">
                            <div className="menuList">
                                <Tooltip title="로그인">
                                    <Link to="/login" className="textLink"><PersonRoundedIcon className="userIcon" fontSize="small"/></Link>
                                </Tooltip>
                            </div>
                            <div className="menuList">
                                <Tooltip title="회원가입">
                                    <Link to="/regist" className="textLink"><PersonAddRoundedIcon className="userIcon" fontSize="small"/></Link>
                                </Tooltip>
                            </div>
                        </div>
                    </List>
                </Container>
            </AppBar>
            <div className='background'>
                <img className="backgroundImages" src={background}/>
            </div>
        </div>              
    );

}