const UserReducer = (state = {}, action) => {
    switch (action.type) {
        case "USER_REGIST":
            return {
                  ...state
                , isRegist: true 
            };
        case "USER_LOGIN":
            return {
                ...state
                , isRegist: action.data.isRegist
                , isLogin: action.data.isLogin
                , loginUser: action.data.loginUser
                , menu: action.data.menu
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