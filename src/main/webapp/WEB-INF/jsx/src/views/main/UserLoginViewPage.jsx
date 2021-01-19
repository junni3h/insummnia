import {Link} from 'react-router-dom';

import {Button, Container, TextField} from '@material-ui/core';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';

export default function UserLoginViewPage(){

    return(
        <Container component="main" maxWidth="xs">
            <form method="post">
                <div className="loginField">
                    <TextField id="userId" name="userId" label="아이디" value="" onChange="" variant="outlined" margin="normal" fullWidth required></TextField>
                    <TextField type="password" id="passWord" name="password" label="비밀번호" value="" onChange=""variant="outlined" margin="normal" fullWidth required></TextField>
                </div>
                <div className="buttonField">
                    <Button type="submit" variant="contained" color="primary" className="login" margin="normal" fullWidth><PersonRoundedIcon fontSize="small"/>로그인</Button>
                    <Link to="/regist" className="textLink"><Button type="button" variant="contained" color="primary" className="regist" margin="normal" fullWidth><PersonAddRoundedIcon fontSize="small"/>회원가입</Button></Link>
                </div>
            </form>
        </Container>
    );

}