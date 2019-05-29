import React, {useEffect} from 'react';
import axios from 'axios'
import useGlobal from '../../hooks/useGlobal'

const CharacterList = (props) => {
    const [globalState, setGlobalState] = useGlobal();
    const { characters, loading, next, maxPage } = globalState
    const {favoriteEpisodes,episodesWatched} = globalState.users

    useEffect(() => {
        const getApi = async () => {
          const response = await axios.get('https://rickandmortyapi.com/api/episode/')
          setGlobalState({...globalState,
            characters: [...globalState.characters, 
                ...response.data.results],
            loading: false,
            ...globalState.infoPage,
            next: response.data.info.next,
            maxPage: response.data.info.pages
            })
            }
        getApi()
      }, [])

    const loadMore = async () => {
        const response = await axios.get(next)
        setGlobalState({...globalState,
            characters: [...globalState.characters, 
            ...response.data.results],
            loading: false,
            ...globalState.infoPage,
            next: response.data.info.next,
            maxPage: response.data.info.pages
            })
    }

    const toggleFavorites = (id) => {
        console.log('added to favorites: ', id)
        const alreadyFavorite = favoriteCharacters.includes(id)
        console.log('favoriteCharacters',favoriteCharacters)
        if (!alreadyFavorite) {
            setGlobalState({...globalState,
                users: {...globalState.users,
                favoriteCharacters: [...globalState.users.favoriteCharacters,id]
                }
            })
        } else {
            const withoutFavorite = favoriteCharacters.filter(el => el !== id)
            console.log('withoutFavorite', withoutFavorite)
            setGlobalState({...globalState,
                users: {...globalState.users,
                favoriteCharacters: withoutFavorite
                }
            })
        }

        

    }

    const highlight = {
        color: 'red',
        marginBottom: '20px'
    }

    const regular = {
        marginBottom: '20px'
    }

    return (
        <div>
        {loading && <div>Loading...</div>}
        {!loading && characters.map((character, index) => (
            <div key={index} style={favoriteCharacters.includes(character.id) ? highlight : regular}>
              <div>
               id: {character.id}
              </div>
              <div>
               name: {character.name}
              </div>
              <div>
               species: {character.species}
              </div>
              <div>
               origin: {character.origin.name}
              </div>
              <button onClick={() => toggleFavorites(character.id)}>Add to Favorites</button>
            </div>
          ))}
          {!loading && <button onClick={() => loadMore()}>Load More</button>}
        </div>

    );
};

export default CharacterList;