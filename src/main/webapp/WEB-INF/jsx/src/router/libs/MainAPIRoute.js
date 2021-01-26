import axios from 'axios';

const API_BASE_URL = "/";

class MinAPIRoute {

    fetchMainAPI = ( ) => {
        return axios.post( API_BASE_URL + "main.do" );
    }

}

export default new MinAPIRoute();