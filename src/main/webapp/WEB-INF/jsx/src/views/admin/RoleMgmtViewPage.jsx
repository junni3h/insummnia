import { React } from "react";
import { Container, Divider, Grid, Typography } from "@material-ui/core";
import TreeView from "@material-ui/lab/TreeView";

import '../../css/common/common.css';


export default function RoleMgmtViewPage(){

    return(
        <Container className="container" component="main" maxWidth="lg" color="inherit">
            <Grid container className="gridContainer" spacing={2}>
                <Grid item xs={3} className="menuTree" >
                    <Typography>
                        Role List
                    </Typography>
                    <Divider variant="fullWidth"/> 
                    <TreeView className="tree">

                    </TreeView>
                </Grid>
            </Grid>
        </Container>
    );

}