import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadPlaylists, removePlaylist } from '../store/playlist.actions'
import { PlaylistList } from '../cmps/playlist-list'
import { SET_FILTER, SET_SONGS_LIST } from '../store/playlist.reducer'
import { youtubeService } from '../services/youtube.service'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { PlaylistFilter } from '../cmps/playlist-filter'
import { GenreList } from '../cmps/genre-list'
import { AppDivider, PlayBtn } from '../cmps/form'
import { ISPLAYING, SET_CURRENT_SONG } from '../store/player.reducer'
import { Music } from '../cmps/music'

export function PlaylistSearch() {
  const playlists = useSelector(storeState => storeState.playlistModule.playlists)
  const filterBy = useSelector(storeState => storeState.playlistModule.filterBy)
  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
  const currentSong = useSelector(storeState => storeState.playerModule.currentSong)
  const dispatch = useDispatch()
  const [searchResults, setSearchResults] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    onLoadPlaylists(filterBy)
  }, [filterBy])
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 700) setIsMobile(true)
      if (window.innerWidth > 700) setIsMobile(false)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  async function onLoadPlaylists(filterBy) {
    try {
      await loadPlaylists(filterBy)
    } catch (err) {
      showErrorMsg('Cannot load playlists', err)
    }
  }

  function onSetFilter(filterBy) {
    console.log("filterBy", filterBy.txt)
    youtubeService.getVideoResults(filterBy.txt)
      .then(res => {
        setSearchResults(res)
        dispatch({ type: SET_SONGS_LIST, playSongs: res })
        console.log(res)
      })
    dispatch({ type: SET_FILTER, filterBy })
  }

  function handlePlayPauseClick(song) {
    dispatch({ type: SET_CURRENT_SONG, song })
    if (song.id !== currentSong.id) {
      dispatch({ type: ISPLAYING, isPlaying: true })
    } else {
      dispatch({ type: ISPLAYING, isPlaying: !isPlaying })

      console.log("currentSong", currentSong)
    }



  }


  if (!playlists) return
  return <section className="main-page playlist-search">
    <PlaylistFilter onSetFilter={onSetFilter} />

    {searchResults && <>
      <h2>Songs</h2>
      <ul className="song-list">
        {searchResults.map(song =>
          <li className="song-preview" key={song.id}>
            <div className="img-container">
              <img src={song.imgUrl} alt="" />
              <Music handlePlayPauseClick={handlePlayPauseClick} song={song} songId={song.id || '4m1EFMoRFvY'} />
            </div>
            <div className="cover-container"></div>
            {/* <h5>{song.title}</h5> */}

            <div className='song-info'>
              {/* TITLE FORMATTED */}
              {(!isMobile) ? <small title={song.title}>{song.title.slice((song.title.indexOf('-' || ':') + 2), song.title.length + 1).slice(0, 50)}{song.title.length > 50 && "..."}</small> : <small title={song.title}>{song.title.slice((song.title.indexOf('-' || ':') + 2), song.title.length + 1).slice(0, 15)}{song.title.length > 15 && "..."}</small>}
              {/* ARTIST NAME */}
              <small>{song.title.substring(0, song.title.indexOf("-" || ":"))}</small>
            </div>
            {/* {(!isMobile) ? <h5 title={song.title}>{song.title.slice((song.title.indexOf('-' || ':') + 2),
              song.title.length + 1).slice(0, 50)}{song.title.length > 50 && "..."}</h5> :
              <h5 title={song.title}>{song.title.slice((song.title.indexOf('-' || ':') + 2),
                song.title.length + 1).slice(0, 15)}{song.title.length > 15 && "..."}</h5>} */}


          </li>)}
      </ul>
    </>}

    {!searchResults && <>

      <h2>Browse all</h2>
      <GenreList />
      <AppDivider />
    </>}
  </section>
} 