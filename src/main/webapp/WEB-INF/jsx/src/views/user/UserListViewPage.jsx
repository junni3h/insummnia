import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Container } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import '../../css/user/UserListView.css';

export default function UserListViewPage() {

    const [list, setList] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const result = await axios.post("/user/list.json" );
            setList(result.data);
        }
        fetchData();
    }, []);

    return(
        <Container className="container" component="main" maxWidth="lg" color="inherit">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table id="table" size="small">
                            <TableHead className="tableHeader">
                                <TableCell>아이디</TableCell>
                                <TableCell>이름</TableCell>
                                <TableCell>별명</TableCell>
                                <TableCell>가입일</TableCell>
                            </TableHead>
                            <TableBody>
                                {list.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Link to={`/admin/user/info/${item.userId}`}>
                                                {item.userId}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{item.userNm}</TableCell>
                                        <TableCell>{item.nickNm}</TableCell>
                                        <TableCell>{item.createDatetime}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );

}