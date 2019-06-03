import React from "react";
import useGlobal from "../../hooks/useGlobal";

const SimilarTaste = props => {
  const [globalState, setGlobalState] = useGlobal();
  const { loggedIn } = globalState;

  const yourEpisodeLikes = globalState.users[loggedIn].favoriteEpisodes;
  const usersAlsoLiked = globalState.userList.filter(el =>
    globalState.users[el].favoriteEpisodes.some(
      element => yourEpisodeLikes.indexOf(element) >= 0
    )
  );
  const withoutCurrentUser = usersAlsoLiked.filter(
    el => el !== loggedIn.toString()
  );
  const usersThatAlsoLike = withoutCurrentUser.map(
    el => globalState.users[el].name
  );
  console.log(yourEpisodeLikes);
  console.log(usersAlsoLiked);
  console.log(withoutCurrentUser);
  console.log(usersThatAlsoLike.length);
  return (
    <div>
      <h2>You like some of the same episodes as:</h2>
      {usersThatAlsoLike.length <= 0 && <p>No one :(</p>}
      {usersThatAlsoLike.map((user, index) => (
        <ul>
          <li key={index}>{user}</li>
        </ul>
      ))}
    </div>
  );
};

export default SimilarTaste;
