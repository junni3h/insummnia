import {React, Component} from 'react';
import {Button, Container, TextField} from '@material-ui/core';

export default class UserLoginViewPage extends Component{

    render(){
        return(
            <Container component="main" maxWidth="xs">
                <form method="post">
                    <div className="loginField">
                        <TextField id="userId" name="userId" label="아이디" value="" onChange="" variant="outlined" margin="normal" fullWidth required></TextField>
                        <TextField type="password" id="passWord" name="password" label="비밀번호" value="" onChange=""variant="outlined" margin="normal" fullWidth required></TextField>
                    </div>
                    <div className="buttonField">
                        <Button type="submit" variant="contained" color="primary" className="login" margin="normal" fullWidth>로그인</Button>
                        <Button type="button" variant="contained" color="primary" className="regist" margin="normal" fullWidth>회원가입</Button>
                    </div>
                </form>
            </Container>
        );
    }

}