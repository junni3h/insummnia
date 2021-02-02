import { React, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MenuAPIRoute from '../../router/libs/MenuAPIRoute';

import { Button, Checkbox, Container, Divider, FormControl, FormControlLabel, FormLabel, Grid, Paper, Switch, Table, TableCell, TableRow, TextField, Typography } from '@material-ui/core';
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import '../../css/common/common.css';

export default function MenuMgmtViewPage() {

    const login = useSelector(state => state.UserReducer);

    const [ menu, setMenu ] = useState([]);
    const [ info, setInfo ] = useState({});

    const [ value, setValue ]  = useState('');
    const [ isAdmin, setIsAdmin ] = useState(false);

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

                        if(data.isAdmin){
                            setIsAdmin(true);
                        } else {
                            setIsAdmin(false);
                        }

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

    const handleInfoCheckChange = (event) => {
        const target = event.target;
        const value  = target.checked;
        const name   = target.name;

        setIsAdmin(value);
        setInfo(
            {
                  ...info
                , [name]: value
            }
        );
    }

    const handleInfoSubmit = (event) => {
        const params = info;
        console.log("handleInfoSubmit ==> " , params);

        MenuAPIRoute.fetchUpdateMenuItem(params)
            .then( res => {
                const data = res.data;
                console.log(data);

                if(data.isUpdate){
                    if(window.confirm(data.message)){
                        fetchData();
                    }
                } else {
                    alert(data.message);
                }
            });

        event.preventDefault();
    }
    
    if(login.isLogin){
        return (
            <Container className="container" component="main" maxWidth="lg" color="inherit">
                <Grid container className="gridContainer" spacing={2}>
                    <Grid item xs={3} className="menuTree" >
                        <Typography>
                            Menu List
                        </Typography>
                        <Divider className="divider"/>
                        <TreeView className="tree" 
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpandIcon={<ChevronRightIcon />}
                                onNodeSelect={handleNodeClick}>
                            {renderTree(menu)}
                        </TreeView>
                    </Grid>
                    <Divider orientation="vertical" flexItem/>
                    <Grid item xs={8} className="menuInfo">
                        <form onSubmit={handleInfoSubmit} method="post">
                            <Typography>
                                Menu Info
                            </Typography>
                            <Divider className="divider"/>
                            <Table size="small">
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <TextField 
                                            className="textField"
                                            id="menuNmKr"
                                            name="menuNmKr"
                                            label="Name (Korean)"
                                            value={info.menuNmKr} 
                                            onChange={handleInfoChange} 
                                            variant="outlined" 
                                            size="small" 
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}>
                                        </TextField>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            className="textField" 
                                            id="menuNmEn"
                                            name="menuNmEn" 
                                            label="Name (English)" 
                                            value={info.menuNmEn} 
                                            onChange={handleInfoChange} 
                                            variant="outlined" 
                                            size="small" 
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}>
                                        </TextField>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            className="textField" 
                                            id="menuUrl" 
                                            name="menuUrl" 
                                            label="Url" 
                                            value={info.menuUrl} 
                                            onChange={handleInfoChange}
                                            variant="outlined" 
                                            size="small"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}>
                                        </TextField>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            className="textField" 
                                            id="menuIcon" 
                                            name="menuIcon" 
                                            label="Icon" 
                                            value={info.menuIcon} 
                                            onChange={handleInfoChange}
                                            variant="outlined" 
                                            size="small"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}>
                                        </TextField>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <TextField 
                                            className="textField"
                                            id="menuDepth" 
                                            name="menuDepth" 
                                            label="Level" 
                                            value={info.menuDepth} 
                                            onChange={handleInfoChange} 
                                            variant="outlined"
                                            size="small" 
                                            fullWidth
                                            disabled
                                            InputLabelProps={{ shrink: true }}>
                                        </TextField>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField 
                                            className="textField"
                                            id="menuOrd" 
                                            name="menuOrd" 
                                            label="Order" 
                                            value={info.menuOrd} 
                                            onChange={handleInfoChange} 
                                            variant="outlined"
                                            size="small" 
                                            fullWidth
                                            disabled
                                            InputLabelProps={{ shrink: true }}>
                                        </TextField>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={6}>
                                            <FormControlLabel
                                                className="formLabel" 
                                                label="Is Admin?"
                                                control={
                                                    <Checkbox 
                                                        id="isAdmin"
                                                        name="isAdmin"
                                                        checked={isAdmin}
                                                        onChange={handleInfoCheckChange}
                                                    />
                                                }/>
                                    </TableCell>
                                </TableRow>
                            </Table>
                            <div className="btnRightField">
                                <Button className="btnRight" 
                                    type="submit" 
                                    variant="contained" 
                                    color="primary" 
                                    size="small" 
                                    startIcon={<UpdateRoundedIcon />}>
                                저장</Button>
                            </div>
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