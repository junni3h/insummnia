import { React, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MenuAPIRoute from '../../router/libs/MenuAPIRoute';

import { Button, Checkbox, Container, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, Paper, Switch, Table, TableCell, TableRow, TextField, Tooltip, Typography } from '@material-ui/core';
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
    const [ itemId, setItemId] = useState('');
    const [ isAdmin, setIsAdmin ] = useState(false);

    async function fetchData(){
        const result = await MenuAPIRoute.fetchFindMenuItemByTree();
        const data = result.data;

        setMenu(data);
        setInfo({});
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

    // TreeItem 클릭 이벤트 함수
    const handleNodeClick = (event, node) => {
        // 메뉴 추가시 현재 선택된 메뉴의 아이디를 저장
        setItemId(node);

        // 현재 선택된 메뉴 아이디
        const menuId = node;
        if(menuId != 'newId'){ // 메뉴 아이디가 추가할 메뉴 아이디가 아닐 경우
            // 현재 선택된 메뉴에 해당하는 정보를 DB에서 읽어옴
            MenuAPIRoute.fetchFindMenuItemByMenuId(menuId)
                    .then( res => {
                        const data = res.data;

                        // 현재 선택된 메뉴가 관리자용 메뉴 여부 판단하여
                        //관리자 여부 플래그에 값을 반환
                        if(data.isAdmin){
                            setIsAdmin(true);
                        } else {
                            setIsAdmin(false);
                        }

                        setInfo(data);
                    });
        } else { // 메뉴 아이디가 추가할 메뉴 아이디일 경우
            // 추가할 메뉴 정보를 반환
            setInfo({
                    menuId: node
                ,   menuUpperId: itemId
                ,   menuNmKr: ''
                ,   menuNmEn: ''
                ,   menuUrl: ''
                ,   menuDepth: ''
                ,   menuOrder: ''
                ,   createUserId: login.loginUser.userId
                ,   updateUserId: login.loginUser.userId
                ,   isAdmin: false
                ,   isAddition: true
                ,   isDeleted: false
            });
            
            setItemId('');
        }
        
    }

    // handleNodeAddClick 함수의 부가 함수
    // 메뉴의 아이디가 최상위 부모 메뉴 아이디가 아닐 경우
    // 해당 아이디의 메뉴를 찾아줌.
    const findMenuId = (node) => {

        const child = {
                id: "newId"
            ,   upperId : itemId
            ,   label : "Label"
            ,   children : []
        };
 
        if(Array.isArray(node)){
            node.forEach(function(item, index){
                if(item.id ===itemId){ // 해당 메뉴 아이디와 찾는 부모 메뉴와 일치할 경우
                    // 해당 메뉴에 자식 메뉴를 추가
                    item.children.push(child);
                    return false;
                } else { // 해당 메뉴 아이디와 찾는 부모 메뉴와 일치하지 않은 경우
                    // 다시 함수를 호출하여 해당 메뉴를 찾음
                    findMenuId(item.children);
                }
            });
        }

        return node;
    }

    // 메뉴 추가 버튼 클릭 이벤트 함수
    const handleNodeAddClick = () => {
        const children = [];
        const child = {
                id: "newId"
            ,   upperId : itemId
            ,   label : "Label"
            ,   children : []
        };

        // 메뉴의 아이디가 최상위 부모 메뉴 아이디일 경우
        if(itemId === menu.id) {

            menu.children.map((item) => (
                children.push(item)
            ));

            // 최상위 부모 메뉴의 자식 메뉴 리스트에 추가
            children.push(child);

            setMenu({
                ...menu,
                children: children
            });

        } 
        else if(itemId === ''){
            alert("메뉴를 추가하기 전, 메뉴를 선택해주세요!");
        } else { // 메뉴의 아이디가 최상위 부모 메뉴 아이디가 아닐 경우
            const children = findMenuId(menu.children);

            setMenu({
                ...menu
                , children: children
            });
        }

    }

    // 메뉴 삭제 버튼 클릭 이벤트 함수
    const handleNodeDelClick = () => {
        console.log(itemId);
        const params = {};

        if(itemId === menu.id) {
            alert("최상위 메뉴는 삭제할 수 없습니다!");
        } else if(itemId === ''){
            alert("삭제 할 메뉴를 선택해주세요!");
        } 
        else { 

            params.menuId = itemId;
            params.updateUserId = login.loginUser.userId;

            MenuAPIRoute.fetchDeleteMenuItem(params)
                        .then( res => {
                            const data = res.data;

                            // 삭제 성공 여부
                            if(data.success){
                                // 삭제 성공시 페이지 재호출
                                if(window.confirm(data.message)){
                                    setInfo({});
                                    fetchData();
                                }
                            } else { // 삭제 실패시 메시지 호출
                                alert(data.message);
                            }
                        });
        }
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

    // 메뉴 수정 및 추가 이벤트
    const handleInfoSubmit = (event) => {
        const params = info;

        MenuAPIRoute.fetchUpdateMenuItem(params)
                    .then( res => {
                        const data = res.data;

                        // 수정 및 추가 성공 여부
                        if(data.success){
                            // 수정 및 추가 성공시 페이지 재호출
                            if(window.confirm(data.message)){
                                fetchData();
                            }
                        } else { // 수정 및 추가 실패시 메시지 호출
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
                            <Tooltip title="추가">
                                <IconButton className="btnRight" size="small">
                                    <AddCircleRoundedIcon className="userIcon" fontSize="small" onClick={handleNodeAddClick} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="삭제">
                                <IconButton className="btnRight" size="small">
                                    <HighlightOffRoundedIcon className="userIcon" fontSize="small" onClick={handleNodeDelClick} />
                                </IconButton>
                            </Tooltip>
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
                                {info.isAddition ? (
                                        <TableRow>
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
                                        </TableRow>
                                    ) : (
                                        null
                                    )
                                }
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