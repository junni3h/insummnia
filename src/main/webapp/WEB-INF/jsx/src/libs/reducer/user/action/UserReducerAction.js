const regist = () => {
    return {
        type: 'USER_REGIST'
    };
};

const login = data => {
    return {
          type: 'USER_LOGIN'
        , data
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