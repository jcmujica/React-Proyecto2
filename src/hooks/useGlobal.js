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
      name: "Daenerys",
      email: "dan@rm.com",
      password: "123",
      favoriteEpisodes: [],
      episodesWatched: [],
      favoriteCharacters: []
    },
    "2": {
      name: "Tyrion",
      email: "ty@rm.com",
      password: "123",
      favoriteEpisodes: [],
      episodesWatched: [],
      favoriteCharacters: []
    },
    "3": {
      name: "Jon",
      email: "jon@rm.com",
      password: "123",
      favoriteEpisodes: [],
      episodesWatched: [],
      favoriteCharacters: []
    }
  },
  userList: ["1", "2", "3"],
  loggedIn: null,
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
