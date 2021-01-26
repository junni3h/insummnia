import { combineReducers } from 'redux';
import UserReducer from './user/reducer/UserReducer';
import MenuReducer from './menu/reducer/MenuReducer';


const RootReducer = combineReducers(
    {
            UserReducer
        ,   MenuReducer
    }
);

export default RootReducer;