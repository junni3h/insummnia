const regist = () => {
    return {
        type: 'USER_REGIST'
    };
};

const login = user => {
    return {
          type: 'USER_LOGIN'
        , user
    };
};

const logout = () => {
    return {
        type: 'USER_LOGOUT'
    }
}

export default { 
        regist
    ,   login
    ,   logout
};