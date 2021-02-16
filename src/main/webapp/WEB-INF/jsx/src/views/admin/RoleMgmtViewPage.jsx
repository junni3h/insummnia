import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import RoleAPIRoute from "../../libs/router/RoleAPIRoute";
import '../../css/common/common.css';

import { Button, Card, CardHeader, Checkbox, Container, Divider, Grid, IconButton, InputAdornment, List, ListItem, ListItemIcon, ListItemText, Table, TableCell, TableRow, TextField, Typography } from "@material-ui/core";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import UserAPIRoute from "../../libs/router/UserAPIRoute";

export default function RoleMgmtViewPage(){

    const login = useSelector(state => state.UserReducer);

    const [ tree, setTree ] = useState([]);
    const [ role, setRole ] = useState({});
    const [ id, setId ] = useState('');

    const [ user, setUser ] = useState([]);
    const [ roleUser, setRoleUser ] = useState([]);

    const [ checked, setChecked ] = useState([]);
    const [ type, setType ] = useState([]);

    async function fetchTree(){
        const result = await RoleAPIRoute.fetchRoleTree();
        const data = result.data;
        console.log(data);
        setTree(data);
    }

    useEffect(() => {
        fetchTree();
    }, []);

    // 권한 트리 구조 화면 생성
    const renderTree = (node) => (
        node.map((item) => (
            <TreeItem nodeId={item.id} key={item.id} label={item.label}>
            </TreeItem>
        ))
    );

    // 권한 별 사용자 리스트 화면 생성
    const renderCard = (title, items) => (
        <Grid item>
            <Typography>
                {title}
            </Typography>
            <Card variant="outlined">
                <CardHeader
                    subheader={`${numberOfChecked(items)} / ${items.length} selected`}
                />
                <List className="card" dense component="div" role="list">
                {
                    items.length != 0 ? (
                        items.map((item) => (
                            <ListItem key={item.userId} role="listitem" button onClick={handleChecked(item.userId)}>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={checked.indexOf(item.userId) !== -1}
                                    >
                                        
                                    </Checkbox>
                                </ListItemIcon>
                                <ListItemText id={item.userId} primary={`${item.userNm}`} />
                            </ListItem>
                        ))
                    ) : (
                        null
                    )
                }
                </List>
            </Card>
        </Grid>
    );

    // 권한 트리 노드 클릭 이벤트
    const handleNodeClick = ( event, node ) => {
        setChecked([]);

        // node => 권한 아이디
        const roleId = node;
        setId(roleId);

        // 권한 아이디가 새로 추가될 아이디가 아닐 경우
        // 기존 권한 아이디로 인식
        if(roleId != 'newId'){
            // 권한 아이디별 정보 조회 API 호출
            RoleAPIRoute.fetchRoleById(roleId)
                        .then(res => {
                            const data = res.data;
                            setRole(data);
                        });
            
            // 권한 아이디별 사용자 조회 API 호출
            UserAPIRoute.fetchRoleUser(roleId)
                        .then(res => {
                            const data = res.data;
                            console.log("user ==> ", data);
                            setUser(data.expectUsers);
                            setRoleUser(data.roleUsers);
                        });
        } else {
            setRole({
                    roleId: roleId
                ,   roleNmKr: ''
                ,   roleNmEn: ''
            });
        }

    }

    // 사용자 권한 추가 및 삭제
    const handleSubmitChangeUser = ( event ) => {
        const params = {};

        // 삭제할 사용자 권한 데이터 가공
        if(userChecked.length != 0){
            const list = [];

            userChecked.map(( item ) => {
                const param = {};
                param.userId = item;
                param.roleId = id;
                
                list.push(param);
            });
            
            params.expectUsers = list;
        }

        // 추가할 사용자 권한 데이터 가공
        if(roleUserChecked.length != 0){
            const list = [];

            roleUserChecked.map(( item ) => {
                const param = {};
                param.userId = item;
                param.roleId = id;
                param.createUserId = login.loginUser.userId;

                list.push(param);
            });

            params.roleUsers = list;
        }

        // 사용자 권한 추가 및 삭제 API 호출
        RoleAPIRoute.fetchUpdateUserRole(params)
                    .then( res => {
                        const data = res.data;

                        if(data.success){
                            // 사용자 권한 추가 및 삭제 성공시 메시지 호출
                            if(window.confirm(data.message)){
                               // 성공시 노드 클릭 이벤트 호출
                               handleNodeClick(null, id);
                            };
                        } else {
                            // 사용자 권한 추가 및 삭제 실패시 메시지 호출
                            alert(data.message);
                        }
                    });

        event.preventDefault();
    }

    // 체크박스 체크 이벤트
    const handleChecked = (item) => () => {
        // 체크한 아이템 리스트에 데이터 존재 여부 파악
        const currentIndex = checked.indexOf(item);
        const newChecked = [
            ...checked
        ];

        // 체크한 아이템 리스트에 데이터가 없을 경우 
        // indexOf에서 -1 반환
        if(currentIndex === -1){
            // 존재하지 않을 경우 리스트에 추가
            newChecked.push(item);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    }

    // 사용자 권한 삭제시 리스트 변경 이벤트 (화면)
    const handleChangeUser = () => {
        added(roleUserChecked, roleUser, 'user');
        deleted(roleUserChecked, roleUser);   
    }

    // 사용자 권한 추가시 리스트 변경 이벤트 (화면)
    const handleChangeRoleUser = () => {
        added(userChecked, user, 'roleUser');
        deleted(userChecked, user);
    }

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setRole({
              ...role
            , [name]: value
        });
    }

    // 사용자 권한 유형에 따른 리스트 추가 이벤트
    const added = (checked, items, type) => {
        checked.map((value) => {
            items.map((item) => {
                // 체크된 사용자와 리스트의 사용자가 일치할 경우
                if(item.userId === value){
                    const param = {};
                    param.userId = item.userId;
                    param.userNm = item.userNm;

                    // 타입이 'USER' 일 경우 사용자 권한 삭제
                    // 권한 없는 사용자 리스트로 사용자 추가
                    if(type === 'user'){
                        setUser(user.concat(param));
                    } else {
                        // 타입이 'ROLEUSER'일 경우 사용자 권한 추가
                        // 권한 있는 사용자 리스트로 사용자 추가
                        setRoleUser(roleUser.concat(param));
                    }
                    
                }
            });
        });
    }

    // 사용자 리스트 삭제 이벤트
    const deleted = (checked, items) => {
        const idx = [];
        checked.map((value) => {
            items.findIndex((item, index) => {
                // 체크된 사용자와 리스트 사용자가 일치할 경우
                if(item.userId === value){
                    // 인덱스를 관리할 배열에 인데스를 추가
                    idx.push(index);
                };
            });
        });

        // 인덱스 배열 반복문
        idx.map((value) => {
            // 인덱스 배열에 맞는 데이터를 삭제
            items.splice(value, 1);
        });
    }

    //
    const intersection = (checked, items) => {
        const itemList = [];
        items.map((item) => {
            itemList.push(item.userId);
        });
    
        return checked.filter((value) => itemList.indexOf(value) !== -1);
    }

    const userChecked = intersection(checked, user);
    const roleUserChecked = intersection(checked, roleUser);

    // 체크박스 체크된 수 체크
    const numberOfChecked = (items) => intersection(checked, items).length;

    return(
        <Container className="container" component="main" maxWidth="lg" color="inherit">
            <Grid container className="gridContainer" spacing={2}>
                <Grid item xs={3} className="roleTree" >
                    <Typography>
                        Role List
                    </Typography>
                    <Divider variant="fullWidth"/> 
                    <TreeView className="tree" 
                            defaultCollapseIcon={<ArrowDropDownRoundedIcon />}
                            defaultExpandIcon={<ArrowRightRoundedIcon />}
                            onNodeSelect={handleNodeClick}
                    >
                        {renderTree(tree)}
                    </TreeView>
                </Grid>
                <Divider orientation="vertical" flexItem/>
                <Grid item xs={8} className="roleInfo">
                    <Grid item className="roleInfo">
                        <Typography>
                            Role Info
                        </Typography>
                        <Divider className="divider"/>
                        <Table size="small">
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <TextField 
                                        className="textField"
                                        id="roleNmKr"
                                        name="roleNmKr"
                                        label="Name (Korean)"
                                        value={role.roleNmKr} 
                                        onChange={handleInputChange}
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
                                        id="roleNmEn"
                                        name="roleNmEn" 
                                        label="Name (English)" 
                                        value={role.roleNmEn} 
                                        onChange={handleInputChange}
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
                                <TableCell colSpan={6}>
                                    <div className="btnRightField">
                                        <Button className="btnRight" 
                                            type="submit" 
                                            variant="contained" 
                                            color="primary" 
                                            size="small" 
                                            startIcon={<UpdateRoundedIcon />}>
                                        저장</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </Table>
                    </Grid>
                    <Grid item className="gridItem">
                        <Typography>
                            Role User
                        </Typography>
                        <Divider className="divider"/>
                        <Grid container spacing={2} justify="center" alignItems="center">
                            {renderCard('Choice', user)}
                            <Grid>
                                <Grid container direction="column" alignItems="center">
                                    <IconButton
                                        onClick={handleChangeUser}
                                    >
                                        <ArrowBackIosRoundedIcon 
                                            fontSize="small"
                                        />
                                    </IconButton>
                                    <IconButton
                                        onClick={handleChangeRoleUser}
                                    >
                                        <ArrowForwardIosRoundedIcon 
                                            fontSize="small"
                                        />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            {renderCard('Choosen', roleUser)}
                        </Grid>
                        <Divider className="divider"/>
                        <div className="btnRightField">
                            <Button className="btnRight" 
                                type="button" 
                                variant="contained" 
                                color="primary" 
                                size="small" 
                                onClick={handleSubmitChangeUser}
                                startIcon={<UpdateRoundedIcon />}>
                            저장</Button>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );

}