import React, {useEffect} from 'react';
import axios from 'axios'
import useGlobal from '../../hooks/useGlobal'

const EpisodeList = (props) => {
    const [globalState, setGlobalState] = useGlobal();
    const { episodes, loading, next, maxPage } = globalState
    const {favoriteEpisodes,episodesWatched} = globalState.users

    useEffect(() => {
        const getApi = async () => {
          const response = await axios.get('https://rickandmortyapi.com/api/episode/')
          console.log(response)
          setGlobalState({...globalState,
            episodes: [...globalState.episodes, 
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
            episodes: [...globalState.episodes, 
            ...response.data.results],
            loading: false,
            ...globalState.infoPage,
            next: response.data.info.next,
            maxPage: response.data.info.pages
            })
    }

    const toggleFavorites = (id) => {
        console.log('added to favorites: ', id)
        const alreadyFavorite = favoriteEpisodes.includes(id)
        console.log('favoriteepisodes',favoriteEpisodes)
        if (!alreadyFavorite) {
            setGlobalState({...globalState,
                users: {...globalState.users,
                favoriteEpisodes: [...globalState.users.favoriteEpisodes,id]
                }
            })
        } else {
            const withoutFavorite = favoriteEpisodes.filter(el => el !== id)
            console.log('withoutFavorite', withoutFavorite)
            setGlobalState({...globalState,
                users: {...globalState.users,
                favoriteEpisodes: withoutFavorite
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
        {!loading && episodes.map((episode, index) => (
            <div className='episode-card' key={index} style={favoriteEpisodes.includes(episode.id) ? highlight : regular}>
              <div>
               ID: {episode.id}
              </div>
              <div>
               Name: {episode.name}
              </div>
              <div>
               Air Date: {episode.air_date}
              </div>
              <div>
               Episode: {episode.episode}
              </div>
              <button onClick={() => toggleFavorites(episode.id)}>Add to Favorites</button>
            </div>
          ))}
          {!loading && <button onClick={() => loadMore()}>Load More</button>}
        </div>

    );
};

export default EpisodeList;