import {Link} from 'react-router-dom';
import {Button, Container, Divider} from '@material-ui/core';
import PanToolRoundedIcon from '@material-ui/icons/PanToolRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

export default function AuthoriziedErrorPage() {
    return (
        <Container className="bodyContainer" component="main" maxWidth="xs">
            <PanToolRoundedIcon/>
            <Divider/>
            <p>PLEASE LOGIN .... </p>
            <div className="buttonField">
                <Link to="/login" className="textLink">
                    <Button type="button" className="btnVertical" variant="contained" color="primary" className="regist" margin="normal" startIcon={<PersonRoundedIcon fontSize="small"/>} fullWidth>
                        로그인
                    </Button>
                </Link>
            </div>
        </Container>
    )
}