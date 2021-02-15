import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';

import UserAPIRoute from '../../libs/router/UserAPIRoute';

import { Container } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import '../../css/common/common.css';
import '../../css/common/commonTable.css';
import '../../css/user/UserListView.css';

export default function UserListViewPage() {

    const login = useSelector(state => state.UserReducer);

    const [list, setList] = useState([]);

    async function fetchData(){
        const result = await UserAPIRoute.fetchUserList();
        const data = result.data;

        setList(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    if(login.isLogin){
        return(
            <Container className="container" component="main" maxWidth="lg" color="inherit">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table id="table" size="small">
                                <TableHead className="tableHeader">
                                    <TableCell className="header">아이디</TableCell>
                                    <TableCell className="header">이름</TableCell>
                                    <TableCell className="header">별명</TableCell>
                                    <TableCell className="header">권한</TableCell>
                                    <TableCell className="header">등록일</TableCell>
                                    <TableCell className="header">수정자</TableCell>
                                    <TableCell className="header">등록일</TableCell>
                                </TableHead>
                                <TableBody>
                                    {list.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Link to={`/admin/user/info/${item.userId}`} className="textLink">
                                                    {item.userId}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{item.userNm}</TableCell>
                                            <TableCell>{item.nickNm}</TableCell>
                                            <TableCell>{item.roleNm}</TableCell>
                                            <TableCell>{item.createDatetime}</TableCell>
                                            <TableCell>{item.updateUserId}</TableCell>
                                            <TableCell>{item.updateDatetime}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Container>
        );
    } else {
        return (
            <Redirect to='/error/auth' />
        );
    }

}