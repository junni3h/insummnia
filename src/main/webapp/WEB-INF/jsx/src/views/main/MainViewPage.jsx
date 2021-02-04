import React from 'react';
import { useSelector } from 'react-redux';

import { Container } from '@material-ui/core';

export default function MainViewPage() {

    const login = useSelector(state => state.UserReducer);


    return(
        <Container className="bodyContainer" component="main" maxWidth="xl" color="inherit">
            
        </Container>
    );
}