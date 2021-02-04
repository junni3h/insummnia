import { Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@material-ui/core';
import { React, useState } from 'react';
import { useSelector } from 'react-redux';

import '../../../css/common/common.css';

export default function CommunityWriteViewPage(props) {
    console.log(props);

    const login = useSelector(state => state.UserReducer);
    const [board, setBoard] = useState({});

    const handleChange = ( event ) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        console.log(target);

        setBoard({
            ...board,
            [name]: value
        })
    }

    const handleSubmit = ( event ) => {
        const params = board;
        params.createUserId = login.loginUser.userId;
        console.log(params);

        event.preventDefault();
    }

    return(
        <Container className="container" component="main" maxWidth="lg" color="inherit">
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit} method="post">
                        <TableContainer>
                            <Table id="table" size="medium">
                                <TableRow>
                                    <TableCell colSpan={12}>
                                        <div className="btnRightField">
                                            <Button 
                                                type="submit"
                                                className="btnRight" 
                                                variant="contained" 
                                                color="default" 
                                                size="small"
                                            >
                                                작성하기
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={1}>제목</TableCell>
                                    <TableCell colSpan={8}>
                                        <TextField 
                                            className="textField"
                                            id="boardTitle"
                                            name="boardTitle"
                                            value={board.boardTitle} 
                                            onChange={handleChange} 
                                            variant="outlined" 
                                            size="small" 
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}>
                                        </TextField>
                                    </TableCell>
                                    <TableCell colSpan={1}>작성자</TableCell>
                                    <TableCell colSpan={1}>
                                        <TextField 
                                            className="textField"
                                            id="createUserName"
                                            name="createUserName"
                                            value={`${login.loginUser.nickNm} (${login.loginUser.userId})`} 
                                            variant="outlined" 
                                            size="small" 
                                            fullWidth
                                            disabled
                                        >
                                        </TextField>
                                    </TableCell>
                                </TableRow>
                            </Table>
                        </TableContainer>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
}