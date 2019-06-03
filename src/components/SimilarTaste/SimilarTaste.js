import React from 'react';
import  useGlobal from '../../hooks/useGlobal'

const SimilarTaste = (props) => {
    const [globalState, setGlobalState] = useGlobal();
    const { loggedIn } = globalState

    const yourEpisodeLikes = globalState.users[loggedIn].favoriteEpisodes
    const usersAlsoLiked = globalState.users
    console.log(yourEpisodeLikes)
    console.log(usersAlsoLiked)

    return (
    <div>
        <h2>You like some of the same episodes as:</h2>
    </div>
    );
};

export default SimilarTaste;