import React, { useEffect } from "react";
import axios from "axios";
import useGlobal from "../../hooks/useGlobal";

const CharacterList = props => {
  const [globalState, setGlobalState] = useGlobal();
  const { characters, loading, next, loggedIn } = globalState;
  const { favoriteCharacters } = globalState.users[loggedIn];

  useEffect(() => {
    const getApi = async () => {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character/"
      );
      setGlobalState({
        ...globalState,
        characters: [...globalState.characters, ...response.data.results],
        loading: false,
        ...globalState.infoPage,
        next: response.data.info.next,
        maxPage: response.data.info.pages
      });
    };
    getApi();
  }, []);

  const loadMore = async () => {
    const response = await axios.get(next);
    console.log(response);
    setGlobalState({
      ...globalState,
      characters: [...globalState.characters, ...response.data.results],
      loading: false,
      ...globalState.infoPage,
      next: response.data.info.next,
      maxPage: response.data.info.pages
    });
  };

  const toggleFavorites = id => {
    const alreadyFavorite = favoriteCharacters.includes(id);
    if (!alreadyFavorite) {
      setGlobalState({
        ...globalState,
        users: {
          ...globalState.users,
          [loggedIn]: {
            ...globalState.users[loggedIn],
            favoriteCharacters: [
              ...globalState.users[loggedIn].favoriteCharacters,
              id
            ]
          }
        }
      });
    } else {
      const withoutFavorite = favoriteCharacters.filter(el => el !== id);
      setGlobalState({
        ...globalState,
        users: {
          ...globalState.users,
          [loggedIn]: {
            ...globalState.users[loggedIn],
            favoriteCharacters: withoutFavorite
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
        characters.map((character, index) => (
          <div
            key={index}
            className="character-card"
            style={
              loggedIn && favoriteCharacters.includes(character.id)
                ? highlight
                : regular
            }
          >
            <div>ID: {character.id}</div>
            <img src={character.image} alt="name" />
            <div>Name: {character.name}</div>
            <div>Species: {character.species}</div>
            <div>Origin: {character.origin.name}</div>
            <button onClick={() => toggleFavorites(character.id)}>
              Add to Favorites
            </button>
          </div>
        ))}
      {!loading && <button onClick={() => loadMore()}>Load More</button>}
    </div>
  );
};

export default CharacterList;
