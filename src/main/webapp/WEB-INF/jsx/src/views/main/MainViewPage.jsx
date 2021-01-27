import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import MainAPIRoute from '../../router/libs/MainAPIRoute';

import { Container } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default function MainViewPage() {

    const login = useSelector(state => state.UserReducer);


    return(
        <Container className="bodyContainer" component="main" maxWidth="xl" color="inherit">
            
        </Container>
    );
}