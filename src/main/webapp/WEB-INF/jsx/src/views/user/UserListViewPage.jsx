import {useState, useEffect} from 'react';

import UserAPIRoute from '../../router/libs/UserAPIRoute';

export default function UserListViewPage() {

    const [list, setList] = useState([]);

    useEffect(() => {
        handleGetData();
    })

    const handleGetData = () => {
        UserAPIRoute.fetchListUsers()
            .then( res => {
                const data = res.data;
                handleSetList(data);
            }
        );
    }
    
    const handleSetList = (data) => {
        setList({data});
        console.log(list);
    }

    return(
        <div>UserListViewPage</div>
    );

}