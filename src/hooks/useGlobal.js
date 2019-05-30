import { useState, useEffect } from 'react';

let listeners = [];
let state = ({
  characters: [],
  episodes: [],
  loading: true,
  infoPage: '',
  next: '',
  maxPage: '',
  users: {
    name: '',
    email: '',
    favoriteEpisodes: [],
    episodesWatched: [],
    favoriteCharacters: []}
  })

const setState = (newState) => {
  state = { ...state, ...newState };
  listeners.forEach((listener) => {
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