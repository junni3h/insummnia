import axios from 'axios';

const USER_API_BASE_URL = "/user";

class UserAPIRoute {

    fetchRegistUsers = ( params ) => {
        return axios.post( USER_API_BASE_URL + "/regist.json",  params );
    }

    fetchUpdateUsers = ( params ) => {
        return axios.post( USER_API_BASE_URL + "/update.json", params );
    }

    fetchUserList = ( ) => {
        return axios.get(USER_API_BASE_URL + "/list.json");
    }

    fetchUserInfo = ( param ) => {
        return axios.post( USER_API_BASE_URL + "/info.json",  {userId: param} );
    }

    fetchUserDuplicationById = ( param ) => {
        return axios.post( USER_API_BASE_URL + "/findUserDuplicationById.json", { userId: param } );
    }

    fetchUserDuplicationByNickName = ( param ) => {
        return axios.post( USER_API_BASE_URL + "/findUserDuplicationByNickName.json", { nickNm: param } );
    }

    fetchRoleUser = ( param ) => {
        return axios.post( USER_API_BASE_URL + "/findUserByRoleId.json", { roleId: param } );
    }

    fetchUserLogin = ( params ) => {
        return axios.post( "/login.do", params );
    }

    fetchUserLogout = ( ) => {
        return axios.post( "/logout.do" );
    }

}

export default new UserAPIRoute();