import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiFillClockCircle } from "react-icons/ai";

import YouTube from 'react-youtube';

import { playlistService } from '../services/playlist.service.local'
import { showErrorMsg } from '../services/event-bus.service'
import { youtubeService } from '../services/youtube.service';
import { PlaylistFilter } from '../cmps/playlist-filter';
// import { Music } from '../cmps/music';
import { utilService } from '../services/util.service';
import { addSonfToPlaylist, loadPlaylist, loadPlaylists, removeSongFromPlayList } from '../store/playlist.actions';
import { useSelector } from 'react-redux';



export function PlaylistEdit() {
  const { playlistId } = useParams()
  const playlist = useSelector(storeState => storeState.playlistModule.playlist)
  const [searchResults, setSearchResults] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function handleResize() {
      console.log(window.innerWidth < 960)
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
    // document.body.style.backgroundColor = ' rgb(32, 87, 100)';
    document.body.style.backgroundColor = randomColor;

    // Clean up the effect
    return () => {
      document.body.style.backgroundColor = '#121212';
    };
  }, [playlistId]);

  useEffect(() => {
    loadPlaylist(playlistId)

  }, [playlistId])
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


  if (!playlist) return <section className="main-page playlist-details">
    <div className='playlist-detail-header'>
      <div className='playlist-header-img-container '> <img src='' /></div>
      <div className='playlist-detail-header-info'>
        <div className='playlist-detail-header-title-detail'>Playlist</div>
        <h1 className='playlist-detail-header-title'>PLAYLIST</h1>
        <div className='playlist-detail-header-title-details'>Puki |  songs | 14 min 57 sec</div>
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
    </div></section>

  const { name, songs } = playlist
  return <>
    <section className="main-page playlist-search">
      <PlaylistFilter onSetFilter={onSetFilter} />
    </section>

    <section className="main-page playlist-details">
      <div className='playlist-detail-header'>
        <div className='playlist-header-img-container '> <img src={songs[0].imgUrl} /></div>
        <div className='playlist-detail-header-info'>
          <div className='playlist-detail-header-title-detail'>Playlist</div>
          <h1 className='playlist-detail-header-title'>{name}</h1>
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

      <ul>{songs.map((song, index) => <li key={song.id} className='song' onClick={() => handleSong(song.id)}  >
        <div className="headline-table-col table-num">{index + 1}
        </div>
        <div className="headline-table-col song-detail">
          <div className="table-img-container">
            <img src={song.imgUrl} alt="song" />
          </div>
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
        <ul className='playlist-detail-result-list'>{searchResults.map((song, index) => <li key={song.id} className='song' onClick={() => handleSong(song.id)}  >
          <div className="headline-table-col table-num">{index + 1}
          </div>
          <div className="headline-table-col song-detail">
            <div className="table-img-container">
              <img src={song.imgUrl} alt="song" />
            </div>
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