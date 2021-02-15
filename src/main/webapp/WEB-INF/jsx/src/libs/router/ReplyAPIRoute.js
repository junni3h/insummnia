import axios from 'axios';

const REPLY_API_BASE_URL = "/reply";

class ReplyAPIRoute {

    fetchWriteReplyContent = ( reply ) => {
        return axios.post( REPLY_API_BASE_URL + "/writeReplyContent.json", reply );
    }

}

export default new ReplyAPIRoute();