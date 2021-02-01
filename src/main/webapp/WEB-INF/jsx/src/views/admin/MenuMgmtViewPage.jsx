import { React, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MenuAPIRoute from '../../router/libs/MenuAPIRoute';

import { Button, Container, Grid, Paper, Table, TableCell, TableRow, TextField } from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

export default function MenuMgmtViewPage() {

    const login = useSelector(state => state.UserReducer);

    const [ menu, setMenu ] = useState([]);
    const [ info, setInfo ] = useState({});

    async function fetchData(){
        const result = await MenuAPIRoute.fetchFindMenuItemByTree();
        const data = result.data;

        console.log(data);
        setMenu(data);

    }

    useEffect(() => {
        fetchData();
        
    }, []);

    const renderTree = (node) => (
        <TreeItem nodeId={node.id} key={node.id} label={node.label}>
            {Array.isArray(node.children) ?
                node.children.map((item) => renderTree(item))
                : null
            }
        </TreeItem>
    );

    const handleNodeClick = (event, node) => {
        const menuId = node;

        MenuAPIRoute.fetchFindMenuItemByMenuId(menuId)
                    .then( res => {
                        const data = res.data;
                        console.log("data ==> ", data);
                        setInfo(data);
                    });
    }

    const handleInfoChange = (event) => {
        const target = event.target;
        const value  = target.value;
        const name   = target.name;

        setInfo(
            {
                  ...info
                , [name]: value
            }
        );
    }

    const handleInfoSubmit = (event) => {
        const params = info;
        console.log(info);
        event.preventDefault();
    }
    
    if(login.isLogin){
        return (
            <Container className="container" component="main" maxWidth="lg" color="inherit">
                <Grid container className="gridContainer" spacing={2}>
                    <Grid item xs={6} className="menuTree" >
                        <TreeView className="tree" 
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpandIcon={<ChevronRightIcon />}
                                onNodeSelect={handleNodeClick}>
                            {renderTree(menu)}
                        </TreeView>
                    </Grid>
                    <Grid item xs={6} className="menuInfo">
                        <form onSubmit={handleInfoSubmit} method="post">
                            <Button type="submit" color="primary">수정</Button>
                            <Table size="small">
                                <TableRow>
                                    <TableCell colSpan={1}>아이디</TableCell>
                                    <TableCell colSpan={5}><TextField id="menuId" name="menuId" value={info.menuId} disabled fullWidth></TextField></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={1}>이름(한글)</TableCell>
                                    <TableCell colSpan={2}><TextField id="menuNmKr" name="menuNmKr" value={info.menuNmKr} onChange={handleInfoChange}></TextField></TableCell>
                                    <TableCell colSpan={1}>이름(영문)</TableCell>
                                    <TableCell colSpan={2}><TextField id="menuNmEn" name="menuNmEn" value={info.menuNmEn} onChange={handleInfoChange}></TextField></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={1}>URL</TableCell>
                                    <TableCell colSpan={5}><TextField id="menuUrl" name="menuUrl" value={info.menuUrl} onChange={handleInfoChange} fullWidth></TextField></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={1}>레벨</TableCell>
                                    <TableCell colSpan={2}><TextField id="menuDepth" name="menuDepth" value={info.menuDepth} onChange={handleInfoChange}></TextField></TableCell>
                                    <TableCell colSpan={1}>순서</TableCell>
                                    <TableCell colSpan={2}><TextField id="menuOrd" name="menuOrd" value={info.menuOrd} onChange={handleInfoChange}></TextField></TableCell>
                                </TableRow>
                            </Table>
                        </form>
                    </Grid>
                </Grid>
            </Container>
    
        );
    } else {
        return (
            <Redirect to="/error/auth" />
        );
    }
    
}