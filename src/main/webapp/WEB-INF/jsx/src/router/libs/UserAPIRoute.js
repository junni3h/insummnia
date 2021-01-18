import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/user";

class UserAPIRoute {

    fetchRegistUsers(params) {
        return axios.post( USER_API_BASE_URL + "/regist.json",  params );
    }

}

export default new UserAPIRoute();