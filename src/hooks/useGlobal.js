import { useState, useEffect } from "react";

let listeners = [];
let state = {
  characters: [],
  episodes: [],
  loading: true,
  infoPage: "",
  next: "",
  maxPage: "",
  users: {
    "1": {
      email: "dan@rm.com",
      password: "123",
      favoriteEpisodes: [4],
      episodesWatched: [],
      favoriteCharacters: []
    },
    "2": {
      email: "ty@rm.com",
      password: "123",
      favoriteEpisodes: [],
      episodesWatched: [],
      favoriteCharacters: []
    },
    "3": {
      email: "jon@rm.com",
      password: "123",
      favoriteEpisodes: [4, 1],
      episodesWatched: [],
      favoriteCharacters: []
    }
  },  
  userList: ['1', '2', '3'],
  loggedIn: 1,
  error: null
};

const setState = newState => {
  state = { ...state, ...newState };
  listeners.forEach(listener => {
    listener(state);
  });
};

const useGlobal = () => {
  const newListener = useState()[1];
  useEffect(() => {
    listeners.push(newListener);
  }, []);
  return [state, setState];
};

export default useGlobal;
