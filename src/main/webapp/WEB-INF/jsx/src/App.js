import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import MenuLayout from '../src/views/common/MenuLayout';
import MainViewPage from '../src/views/main/MainViewPage';

import UserLoginViewPage from '../src/views/main/UserLoginViewPage';
import UserRegistViewPage from '../src/views/user/UserRegistViewPage';
import UserListViewPage from '../src/views/user/UserListViewPage';
import UserInfoViewPage from '../src/views/user/UserInfoViewPage';

import NotFoundErrorPage from '../src/views/error/NotFoundErrorPage';
import AccessErrorPage from '../src/views/error/AccessErrorPage';
import AuthoriziedErrorPage from '../src/views/error/AuthoriziedErrorPage';

export default function App(){
    return(
      <Router>
        <MenuLayout />
        <Switch>
          <Route exact path="/" component={MainViewPage}/>
          <Route path="/login" component={UserLoginViewPage}/>
          <Route path="/regist" component={UserRegistViewPage}/>
          <Route path="/admin/user/list" component={UserListViewPage}/>
          <Route path="/admin/user/info/:userId" component={UserInfoViewPage}/>
          <Route path="/error/notfound" component={NotFoundErrorPage}/>
          <Route path="/error/auth" component={AuthoriziedErrorPage}/>
          <Route path="/error/access" component={AccessErrorPage}/>
        </Switch>
      </Router>
    );
}
