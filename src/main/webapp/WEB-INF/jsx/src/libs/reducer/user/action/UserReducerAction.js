const regist = () => {
    return {
        type: 'USER_REGIST'
    };
};

const login = () => {
    return {
        type: 'USER_LOGIN'
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