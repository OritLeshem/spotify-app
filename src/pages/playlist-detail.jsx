import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiFillClockCircle } from "react-icons/ai";
import defaultPhoto from '../assets/imgs/add-pic.png'

import { ISPLAYING, SET_CURRENT_SONG } from '../store/player.reducer';

import { youtubeService } from '../services/youtube.service';
import { utilService } from '../services/util.service';

import { showErrorMsg } from '../services/event-bus.service'
import { PlaylistFilter } from '../cmps/playlist-filter';
import { addSonfToPlaylist, loadPlaylist, removeSongFromPlayList } from '../store/playlist.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Music } from '../cmps/music';
import { loadPlaylists, removePlaylist } from '../store/playlist.actions'


export function PlaylistDetail() {
  const dispatch = useDispatch()
  const { playlistId } = useParams()
  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
  let playlist = useSelector(storeState => storeState.playlistModule.playlist)
  const currentSong = useSelector(storeState => storeState.playerModule.currentSong)
  const [searchResults, setSearchResults] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const playlists = useSelector(storeState => storeState.playlistModule.playlists)

  useEffect(() => {
    loadPlaylist(playlistId)
  }, [playlistId])

  useEffect(() => {
    loadPlaylists('')
  }, [playlist])

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

  useEffect(() => {
    const randomColor = utilService.generateRandomColor()
    document.body.style.backgroundColor = randomColor;

    return () => {
      document.body.style.backgroundColor = '#121212';
    };
  }, [playlistId]);


  function onSetFilter(filterBy) {
    console.log("filterBy", filterBy.txt)
    youtubeService.getVideoResults(filterBy.txt)
      .then(res => setSearchResults(res))
  }

  function handleSong(ev, songId) {
    console.log("song, li clicked", songId);
  }

  function onRemoveSongFromPlayList(ev, songId) {
    ev.stopPropagation()
    console.log("remove song", songId)
    removeSongFromPlayList(playlistId, songId)
  }
  function onAddSongTpPlayList(song) {
    console.log("add song", song)
    if (playlist?.songs.some(checkSong => checkSong.id === song.id)) {
      showErrorMsg("This song is already in this playlist")
      return
    }
    addSonfToPlaylist(playlistId, song)
  }

  function handlePlayPauseClick(song) {
    dispatch({ type: SET_CURRENT_SONG, song })
    if (song.id !== currentSong.id) {
      dispatch({ type: ISPLAYING, isPlaying: true })
    } else {
      dispatch({ type: ISPLAYING, isPlaying: !isPlaying })
    }
  }


  if (!playlist) return
  const { name, songs } = playlist

  return <>
    <section className="main-page playlist-search">
      <PlaylistFilter onSetFilter={onSetFilter} />
    </section>

    <section className="main-page playlist-details">
      <div className='playlist-detail-header'>
        <div className='playlist-header-img-container '> <img src={playlist.imgUrl !== defaultPhoto ? playlist.imgUrl : songs.length ? songs[0].imgUrl : defaultPhoto} /></div>
        <div className='playlist-detail-header-info'>
          <div className='playlist-detail-header-title-detail'>Playlist</div>

          <h1 className='playlist-detail-header-title'>
            {name}
          </h1>

          <div className='playlist-detail-header-title-details'>Puki | {songs.length} songs | 14 min 57 sec</div>
        </div>
      </div>
      <div className="headline-table-title">
        <div className="header-row">
          <div className="headline-table-col">
            <span>#</span>
          </div>
          <div className="headline-table-col">
            <span>TITLE</span>
          </div>
          <div className="headline-table-col">
            <span>ALBUM</span>
          </div>
          <div className="headline-table-col">
            <span>
              <AiFillClockCircle />
            </span>
          </div>
        </div>
      </div>

      <ul className='list-of-playlist'>{songs.map((song, index) => <li key={song.id} className='song' onClick={() => handleSong(song.id)}  >
        <div className="headline-table-col table-num">{index + 1}
        </div>
        <div className="headline-table-col song-detail">
          <div className="table-img-container ">
            <img src={song.imgUrl} alt="song" />
            <Music handlePlayPauseClick={handlePlayPauseClick} song={song} songId={song.id || '4m1EFMoRFvY'} />
          </div>
          <div className="cover-container"></div>
          <div className='song-info'>
            {/* TITLE FORMATTED */}
            {(!isMobile) ? <small title={song.title}>{song.title.slice((song.title.indexOf('-' || ':') + 2), song.title.length + 1).slice(0, 50)}{song.title.length > 50 && "..."}</small> : <small title={song.title}>{song.title.slice((song.title.indexOf('-' || ':') + 2), song.title.length + 1).slice(0, 15)}{song.title.length > 15 && "..."}</small>}
            {/* ARTIST NAME */}
            <small>{song.title.substring(0, song.title.indexOf("-" || ":"))}</small>
          </div>
        </div>
        <small className='song-artist-name'>{song.title.substring(0, song.title.indexOf("-" || ":"))}</small>
        <small onClick={(ev) => onRemoveSongFromPlayList(ev, song.id)} className='fa-regular trash-can'></small>
        <small className='song-time'>time</small>
      </li>)}
      </ul>
      {/* ///result */}
      {searchResults && <>
        <hr />
        <h3>Search results:</h3>
        <ul className='playlist-detail-result-list'>{searchResults?.map((song, index) => <li key={song.id} className='song' onClick={() => handleSong(song.id)}  >
          <div className="headline-table-col table-num">{index + 1}
          </div>
          <div className="headline-table-col song-detail">
            <div className="table-img-container">
              <img src={song.imgUrl} alt="song" />
              <Music handlePlayPauseClick={handlePlayPauseClick} song={song} songId={song.id || '4m1EFMoRFvY'} />
            </div>
            <div className="cover-container"></div>
            <div className='song-info'>
              {(!isMobile) ? <small title={song.title}>{song.title.slice((song.title.indexOf('-' || ':') + 2), song.title.length + 1).slice(0, 30)}{song.title.length > 30 && "..."}</small> : <small title={song.title}>{song.title.slice((song.title.indexOf('-' || ':') + 2), song.title.length + 1).slice(0, 15)}{song.title.length > 15 && "..."}</small>}
              <small>{song.title.substring(0, song.title.indexOf("-" || ":"))}</small>
            </div>
          </div>
          <small className='song-artist-name'>{song.title.substring(0, song.title.indexOf("-" || ":"))}</small>
          <small onClick={() => { onAddSongTpPlayList(song) }} className='fa-regular plus'></small>
          <small className='song-time'>time</small>
        </li>)}
        </ul>
      </>}
    </section>
  </>
}