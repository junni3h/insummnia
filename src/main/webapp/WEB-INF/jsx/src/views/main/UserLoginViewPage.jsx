import {Link} from 'react-router-dom';

import {Button, Container, TextField} from '@material-ui/core';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';

import '../../css/common/common.css';

export default function UserLoginViewPage(){

    return(
        <Container className="bodyContainer" component="main" maxWidth="xs">
            <form method="post">
                <div className="loginField">
                    <TextField id="userId" name="userId" label="아이디" value="" onChange="" variant="outlined" margin="normal" fullWidth required></TextField>
                    <TextField type="password" id="passWord" name="password" label="비밀번호" value="" onChange=""variant="outlined" margin="normal" fullWidth required></TextField>
                </div>
                <div className="buttonField">
                    <Button type="submit" className="btnVertical" variant="contained" color="primary" margin="normal" fullWidth><PersonRoundedIcon fontSize="small"/>로그인</Button>
                    <Link to="/regist" className="textLink"><Button type="button" className="btnVertical" variant="contained" color="primary" className="regist" margin="normal" fullWidth><PersonAddRoundedIcon fontSize="small"/>회원가입</Button></Link>
                </div>
            </form>
        </Container>
    );

}