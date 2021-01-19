import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/user";

class UserAPIRoute {

    fetchRegistUsers(params) {
        return axios.post( USER_API_BASE_URL + "/regist.json",  params );
    }

    fetchListUsers() {
        return axios.post( USER_API_BASE_URL + "/list.json" );
    }

}

export default new UserAPIRoute();