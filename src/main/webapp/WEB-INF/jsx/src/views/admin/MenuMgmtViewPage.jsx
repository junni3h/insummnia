import { React } from 'react';
import { useSelector } from 'react-redux';

import { Container } from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

export default function MenuMgmtViewPage() {

    const login = useSelector(state => state.UserReducer);
    const menu = login.menu;
    
    return (
        <Container className="container" component="main" maxWidth="lg" color="inherit">
            <TreeView className="tree" 
                      defaultCollapseIcon={<ExpandMoreIcon />}
                      defaultExpandIcon={<ChevronRightIcon />}
                      multiSelect>

                          {
                              menu.map((item, index) => (
                                  <TreeItem nodeId={item.menuDepth} label={item.menuNm}>

                                  </TreeItem>
                              ))
                          }

            </TreeView>
        </Container>
    );

}