const UserReducer = (state = {}, action) => {   
    console.log(action);
    switch (action.type) {
        case "USER_REGIST":
            return {
                  ...state
                , isRegist: true 
            };
        case "USER_LOGIN":
            return {
                ...state
                , isRegist: action.user.isRegist
                , isLogin: action.user.isLogin
                , loginUser: action.user.loginUser
            };
        case "USER_LOGOUT":
            return {
                ...state
              , isLogin: false    
          };
        default: 
            return {
                ...state
              , isRegist: false
              , isLogin: false
            };
    }
};

export default UserReducer;