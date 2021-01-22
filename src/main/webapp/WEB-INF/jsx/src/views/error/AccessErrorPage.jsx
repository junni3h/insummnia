import {Container, Divider} from '@material-ui/core';
import PanToolRoundedIcon from '@material-ui/icons/PanToolRounded';

export default function AccessErrorPage() {
    return (
        <Container className="bodyContainer" component="main" maxWidth="xs">
            <PanToolRoundedIcon/>
            <Divider/>
            <p>NOT AUTHORIZIED!!</p>
        </Container>
    );
}