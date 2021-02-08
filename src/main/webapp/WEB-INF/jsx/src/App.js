import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import MenuLayout from '../src/views/common/MenuLayout';
import MainViewPage from '../src/views/main/MainViewPage';
import MyInfoViewPage from './views/user/MyInfoViewPage';

import UserLoginViewPage from '../src/views/main/UserLoginViewPage';
import UserRegistViewPage from '../src/views/user/UserRegistViewPage';
import UserListViewPage from '../src/views/user/UserListViewPage';
import UserInfoViewPage from '../src/views/user/UserInfoViewPage';

import CommunityListViewPage from './views/common/community/CommunityListViewPage';
import CommunityViewPage from './views/common/community/CommunityViewPage';
import CommunityWriteViewPage from './views/common/community/CommunityWriteViewPage';

import MenuMgmtViewPage from '../src/views/admin/MenuMgmtViewPage';

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
          <Route path="/myInfo" component={MyInfoViewPage} />

          <Route exact path="/community/notice" component={CommunityListViewPage}/>
          <Route exact path="/community/board" component={CommunityListViewPage}/>
          <Route exact path="/community/qna" component={CommunityListViewPage}/>
  
          <Route exact path="/community/notice/view/:boardSeq" component={CommunityViewPage}/>
          <Route exact path="/community/board/view/:boardSeq" component={CommunityViewPage}/>
          <Route exact path="/community/qna/view/:boardSeq" component={CommunityViewPage}/>
          
          <Route exact path="/community/notice/write" component={CommunityWriteViewPage}/>
          <Route exact path="/community/board/write" component={CommunityWriteViewPage}/>
          <Route exact path="/community/qna/write" component={CommunityWriteViewPage}/>

          <Route path="/admin/user/list" component={UserListViewPage}/>
          <Route path="/admin/user/info/:userId" component={UserInfoViewPage}/>
          <Route path="/admin/menu/list" component={MenuMgmtViewPage}/>

          <Route path="/error/notfound" component={NotFoundErrorPage}/>
          <Route path="/error/auth" component={AuthoriziedErrorPage}/>
          <Route path="/error/access" component={AccessErrorPage}/>
        </Switch>
      </Router>
    );
}
