import { React, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MenuAPIRoute from '../../router/libs/MenuAPIRoute';

import { Button, Checkbox, Container, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, Paper, Switch, Table, TableCell, TableRow, TextField, Typography } from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

import '../../css/common/common.css';

export default function MenuMgmtViewPage() {

    const login = useSelector(state => state.UserReducer);

    const [ menu, setMenu ] = useState([]);
    const [ info, setInfo ] = useState({});
    const [ children, setChildren ] = useState([]);
    const [ itemId, setItemId] = useState('');
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
        setItemId(node);

        const menuId = node;
        if(node != 'newId'){
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
        } else {
            setInfo({
                    menuId: node
                ,   menuUpperId: itemId
                ,   menuNmKr: ''
                ,   menuNmEn: ''
                ,   menuUrl: ''
                ,   menuDepth: '9'
                ,   menuOrder: '0'
                ,   isAdmin: false
            });
        }
        
    }

    const handleNodeAddClick = () => {
        if(menu.id == itemId){
            setChildren(menu.children);

            const child = {};
            child.id = "newId";
            child.upperId = itemId;
            child.label = "Label";
            child.children = [];

            children.push(child);

            console.log(children);

            setMenu({
                ...menu
                , children: children
            });
        } else {
            alert("메뉴 아이디가 다릅니다");
        }
    }

    const handleNodeDelClick = () => {
        alert("del click");
        console.log("del ==> ", itemId);
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
                        <Divider variant="fullWidth"/> 
                        <div className="rightMenu">
                            <IconButton className="btnRight" size="small">
                                <AddCircleRoundedIcon className="userIcon" fontSize="small" onClick={handleNodeAddClick} />
                            </IconButton>
                            <IconButton className="btnRight" size="small">
                                <HighlightOffRoundedIcon className="userIcon" fontSize="small" onClick={handleNodeDelClick} />
                            </IconButton>
                        </div>
                        <TreeView className="tree" 
                                defaultCollapseIcon={<ArrowDropDownRoundedIcon />}
                                defaultExpandIcon={<ArrowRightRoundedIcon />}
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
                                    {info.menuId == 'newId' ? (
                                            <TableCell colSpan={6}>
                                            <TextField 
                                                className="textField"
                                                id="menuId"
                                                name="menuId"
                                                label="Id"
                                                value={info.menuId} 
                                                onChange={handleInfoChange} 
                                                variant="outlined" 
                                                size="small" 
                                                fullWidth
                                                InputProps={
                                                    {
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <InfoRoundedIcon fontSize="small"/>
                                                            </InputAdornment>
                                                        )
                                                    }
                                                }
                                                InputLabelProps={{ shrink: true }}>
                                            </TextField>
                                        </TableCell>
                                        ):(
                                            null
                                        )
                                    }
                                    </TableRow>
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
                                            InputProps={
                                                {
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <InfoRoundedIcon fontSize="small"/>
                                                        </InputAdornment>
                                                    )
                                                }
                                            }
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
                                            InputProps={
                                                {
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <InfoRoundedIcon fontSize="small"/>
                                                        </InputAdornment>
                                                    )
                                                }
                                            }
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
                                            InputProps={
                                                {
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <InfoRoundedIcon fontSize="small"/>
                                                        </InputAdornment>
                                                    )
                                                }
                                            }
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
                                            InputProps={
                                                {
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <InfoRoundedIcon fontSize="small"/>
                                                        </InputAdornment>
                                                    )
                                                }
                                            }
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
                                            InputProps={
                                                {
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <InfoRoundedIcon fontSize="small"/>
                                                        </InputAdornment>
                                                    )
                                                }
                                            }
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
                                            InputProps={
                                                {
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <InfoRoundedIcon fontSize="small"/>
                                                        </InputAdornment>
                                                    )
                                                }
                                            }
                                            InputLabelProps={{ shrink: true }}>
                                        </TextField>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <FormControl>
                                            <FormControlLabel
                                                className="formLabel" 
                                                label="Is Admin?"
                                                control={
                                                    <Checkbox 
                                                        id="isAdmin"
                                                        name="isAdmin"
                                                        checked={isAdmin}
                                                        onChange={handleInfoCheckChange}
                                                        size="small"
                                                        color="default"
                                                    />
                                                }/>
                                        </FormControl>
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