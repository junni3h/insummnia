import axios from 'axios';

const ROLE_API_BASE_URL = "/role";

class RoleAPIRoute {

    fetchRoleTree = ( ) => {
        return axios.post( ROLE_API_BASE_URL + "/findRoleTree.json" );
    }

    fetchRoleById = ( params ) => {
        return axios.post( ROLE_API_BASE_URL + "/findRoleById.json", {roleId: params} );
    }

    fetchUpdateUserRole = ( params ) => {
        return axios.post( ROLE_API_BASE_URL + "/updateUserRole.json", params );
    }

}

export default new RoleAPIRoute();