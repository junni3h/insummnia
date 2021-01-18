import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import MenuLayout from '../src/views/common/MenuLayout';
import MainViewPage from '../src/views/main/MainViewPage';
import UserLoginViewPage from '../src/views/main/UserLoginViewPage';
import UserRegistViewPage from '../src/views/user/UserRegistViewPage';

export default function App() {
  return (
    <Router>
      <MenuLayout/>
        <Switch>
          <Route exact path="/" component={MainViewPage}></Route>
          <Route path="/login" component={UserLoginViewPage}></Route>
          <Route path="/regist" component={UserRegistViewPage}></Route>
        </Switch>
    </Router>
  );
}

