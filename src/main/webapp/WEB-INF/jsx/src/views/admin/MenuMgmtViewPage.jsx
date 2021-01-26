import {React} from 'react';

import { Container } from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

export default function MenuMgmtViewPage() {
    
    return (
        <Container className="container" component="main" maxWidth="lg" color="inherit">
            <TreeView className="tree" 
                      defaultCollapseIcon={<ExpandMoreIcon />}
                      defaultExpandIcon={<ChevronRightIcon />}
                      multiSelect>

            </TreeView>
        </Container>
    );

}