import {React} from 'react';

export default function CommunityViewPage({match}) {

    console.log(match);

    return(
        <p>{match.path}</p>
    );

}

