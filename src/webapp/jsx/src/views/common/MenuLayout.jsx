import React from 'react';

import {AppBar, Container, List} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

import {Home} from '@material-ui/icons';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';

import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';

import '../../css/common/commonStyle.css';

export default function MenuLayout(){

    const handleDialogClick = (type) => {
        alert("clicked!!");
    }

    return(
        <AppBar position="static">
            <Container maxWidth="xl">
                <List component="nav" aria-labelledby="main navigation">
                    <div className="leftMenu">
                        <div className="menuList">
                            <Home className="menuIcon" fontSize="small"/>
                            <Typography variant="button">
                                Home
                            </Typography>
                        </div>
                        <div className="menuList">
                            <AssignmentIndRoundedIcon className="menuIcon" fontSize="small"/>
                            <Typography variant="button">
                                Profile
                            </Typography>
                        </div>
                    </div>
                    <div className="rightMenu">
                        <div className="menuList">
                            <Tooltip title="로그인">
                                <PersonRoundedIcon className="userIcon" fontSize="small" onClick={handleDialogClick}/>
                            </Tooltip>
                        </div>
                        <div className="menuList">
                            <Tooltip title="회원가입">
                            <PersonAddRoundedIcon className="userIcon" fontSize="small" onClick={handleDialogClick}/>
                            </Tooltip>
                        </div>
                    </div>
                </List>
            </Container>
        </AppBar>
    );

}