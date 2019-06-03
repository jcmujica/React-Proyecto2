import React, { useEffect } from "react";
import axios from "axios";
import useGlobal from "../../hooks/useGlobal";

const EpisodeList = props => {
  const [globalState, setGlobalState] = useGlobal();
  const { episodes, loading, next, loggedIn } = globalState;

  const { favoriteEpisodes, episodesWatched } = globalState.users[loggedIn];

  useEffect(() => {
    const getApi = async () => {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/episode/"
      );
      console.log(response);
      setGlobalState({
        ...globalState,
        episodes: [...globalState.episodes, ...response.data.results],
        loading: false,
        next: response.data.info.next,
        maxPage: response.data.info.pages
      });
    };
    getApi();
  }, []);

  const loadMore = async () => {
    const response = await axios.get(next);
    setGlobalState({
      ...globalState,
      episodes: [...globalState.episodes, ...response.data.results],
      loading: false,
      next: response.data.info.next,
      maxPage: response.data.info.pages
    });
  };

  const toggleFavorites = id => {
    const alreadyFavorite = favoriteEpisodes.includes(id);
    if (!alreadyFavorite) {
      setGlobalState({
        ...globalState,
        users: {
          ...globalState.users,
          [loggedIn]: {
            ...globalState.users[loggedIn],
            favoriteEpisodes: [
              ...globalState.users[loggedIn].favoriteEpisodes,
              id
            ]
          }
        }
      });
    } else {
      const withoutFavorite = favoriteEpisodes.filter(el => el !== id);
      setGlobalState({
        ...globalState,
        users: {
          ...globalState.users,
          [loggedIn]: {
            ...globalState.users[loggedIn],
            favoriteEpisodes: withoutFavorite
          }
        }
      });
    }
  };

  const highlight = {
    color: "red",
    marginBottom: "20px"
  };

  const regular = {
    marginBottom: "20px"
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading &&
        episodes.map((episode, index) => (
          <div
            className="episode-card"
            key={index}
            style={
              loggedIn && favoriteEpisodes.includes(episode.id)
                ? highlight
                : regular
            }
          >
            <div>ID: {episode.id}</div>
            <div>Name: {episode.name}</div>
            <div>Air Date: {episode.air_date}</div>
            <div>Episode: {episode.episode}</div>
            <a href={episode.url}>Episode URL</a>
            {loggedIn && (
              <button onClick={() => toggleFavorites(episode.id)}>
                Add to Favorites
              </button>
            )}
          </div>
        ))}
      {!loading && <button onClick={() => loadMore()}>Load More</button>}
    </div>
  );
};

export default EpisodeList;
