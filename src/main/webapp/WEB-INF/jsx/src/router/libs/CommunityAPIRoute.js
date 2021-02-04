import axios from 'axios';

const COMMU_API_BASE_URL = "/community/";

class CommunityAPIRoute {

    fetchBoardIdByUrl = ( board ) => {
        return axios.post( COMMU_API_BASE_URL + "findBoardIdByUrl.json" , board );
    }

}

export default new CommunityAPIRoute();