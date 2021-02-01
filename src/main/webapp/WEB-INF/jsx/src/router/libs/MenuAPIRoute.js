import axios from 'axios';

const API_BASE_URL = "/menu";

class MenuAPIRoute {

    fetchFindMenuItemByTree = ( ) => {
        return axios.post( API_BASE_URL + "/findByTree.do" );
    }

    fetchFindMenuItemByMenuId = ( menuId ) => {
        return axios.post( API_BASE_URL + "/findByMenuId.do", { menuId: menuId } );
    }

    fetchFindMenuItemByUpperId = ( menuId ) => {
        console.log(menuId);
        return axios.post( API_BASE_URL + "/findByUpperId.do" , { menuId: menuId } );
    }

}

export default new MenuAPIRoute();