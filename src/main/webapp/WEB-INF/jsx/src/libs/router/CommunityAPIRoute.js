import axios from 'axios';

const COMMU_API_BASE_URL = "/community/";

class CommunityAPIRoute {

    fetchBoardById = ( board ) => {
        return axios.post( COMMU_API_BASE_URL + "findBoardById.json", board );
    }

    fetchBoardByUrl = ( board ) => {
        return axios.post( COMMU_API_BASE_URL + "findBoardByUrl.json" , board );
    }

    fetchBoardContentById = ( board ) => {
        return axios.post( COMMU_API_BASE_URL + "findBoardContentById.json", board );
    }

    fetchBoardContent = ( board ) => {
        return axios.post( COMMU_API_BASE_URL + "findBoardContent.json", board );
    }

    fetchWriteBoard = ( board ) => {
        return axios.post( COMMU_API_BASE_URL + "writeBoardContent.json", board );
    }

    fetchUpdateBoard = ( board ) => {
        return axios.post( COMMU_API_BASE_URL + "updateBoardContent.json", board );
    }

    fetchDeleteBoard = ( board ) => {
        return axios.post( COMMU_API_BASE_URL + "deleteBoardContent.json", board );
    }

}

export default new CommunityAPIRoute();