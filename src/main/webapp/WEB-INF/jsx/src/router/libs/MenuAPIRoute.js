import axios from 'axios';

const API_BASE_URL = "/menu";

class MenuAPIRoute {

    fetchFindMenuItemByUpperId = ( menuId ) => {
        console.log(menuId);
        return axios.post( API_BASE_URL + "/findByUpperId.do" , { menuId: menuId } );
    }

}

export default new MenuAPIRoute();