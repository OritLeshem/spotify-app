import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { youtubeService } from '../services/youtube.service'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { loadPlaylists } from '../store/playlist.actions'
import { SET_SONGS_LIST } from '../store/playlist.reducer'
import { ISPLAYING, SET_CURRENT_SONG } from '../store/player.reducer'

import { PlaylistList } from '../cmps/playlist-list'
import { PlaylistFilter } from '../cmps/playlist-filter'
import { GenreList } from '../cmps/genre-list'
import { AppDivider, PlayBtn } from '../cmps/form'
import { Music } from '../cmps/music'

export function PlaylistSearch() {
  const playlists = useSelector(storeState => storeState.playlistModule.playlists)
  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
  const currentSong = useSelector(storeState => storeState.playerModule.currentSong)
  const dispatch = useDispatch()
  const [searchResults, setSearchResults] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

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
    console.log('filterBy', filterBy.txt)
    youtubeService.getVideoResults(filterBy.txt)
      .then(res => {
        setSearchResults(res)
        dispatch({ type: SET_SONGS_LIST, playSongs: res })
        console.log(res)
      })
  }

  const handlePlayPauseClick = (song) => {
    if (song.id === currentSong.id) {
      dispatch({ type: ISPLAYING });
    } else {
      if (isPlaying) {
        dispatch({ type: ISPLAYING });
      }
      dispatch({ type: SET_CURRENT_SONG, song });
      dispatch({ type: ISPLAYING });
    }
  }

  if (!playlists) return
  return <section className='main-page playlist-search'>
    <PlaylistFilter onSetFilter={onSetFilter} />
    {!searchResults && <>

      <h2>Browse all</h2>
      <GenreList />
      <AppDivider />
    </>}
    <section className='main-page playlist-details'>
      {searchResults && <>
        <ul className='playlist-detail-result-list search-detail'>{searchResults?.map((song, index) => <li key={song.id} className='song'   >
          <div className='table-num'>{index + 1}
          </div>
          <div className='song-detail'>
            <div className='table-img-container'>
              <img src={song.imgUrl} alt='song' />
              <Music handlePlayPauseClick={handlePlayPauseClick} song={song} songId={song.id || '4m1EFMoRFvY'} />
            </div>
            <div className='cover-container'></div>
            <div className='song-info'>
              {(!isMobile) ? <small className={currentSong?.id === song.id ? 'chosen-green' : ''} title={song.title}>{song.title.slice((song.title.indexOf('-' || ':') + 2), song.title.length + 1).slice(0, 30)}{song.title.length > 30 && '...'}</small> : <small title={song.title}>{song.title.slice((song.title.indexOf('-' || ':') + 2), song.title.length + 1).slice(0, 15)}{song.title.length > 15 && '...'}</small>}
              <small>{song.title.substring(0, song.title.indexOf('-' || ':'))}</small>
            </div>
          </div>
          <small className='song-artist-name'>{song.title.substring(0, song.title.indexOf('-' || ':'))}</small>

        </li>)}
        </ul>
      </>}
    </section>
  </section >
} 