import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/user";

class UserAPIRoute {

    fetchRegistUsers = ( params ) => {
        return axios.post( USER_API_BASE_URL + "/regist.json",  params );
    }

    fetchUpdateUsers = ( params ) => {
        return axios.post( USER_API_BASE_URL + "/update.json", params );
    }

    fetchUserInfo = ( param ) => {
        return axios.post( USER_API_BASE_URL + "/info.json",  {userId: param} );
    }


}

export default new UserAPIRoute();