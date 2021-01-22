import { combineReducers } from 'redux';
import UserReducer from './user/reducer/UserReducer';


const RootReducer = combineReducers(
    {
        UserReducer
    }
);

export default RootReducer;