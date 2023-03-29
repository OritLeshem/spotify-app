import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiFillClockCircle } from "react-icons/ai";

import YouTube from 'react-youtube';

import { playlistService } from '../services/playlist.service.local'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { youtubeService } from '../services/youtube.service';
import { PlaylistFilter } from '../cmps/playlist-filter';
// import { Music } from '../cmps/music';
import { utilService } from '../services/util.service';
import { addSonfToPlaylist, loadPlaylist, loadPlaylists, removeSongFromPlayList, savePlaylist, updatePlaylist } from '../store/playlist.actions';
import { SET_PLAYLIST } from '../store/playlist.reducer'
import { useDispatch, useSelector } from 'react-redux';
import { uploadService } from '../services/upload.service';



export function PlaylistEdit() {
  const [playlistToEdit, setPlaylistToEdit] = useState(playlistService.getEmptyPlaylist())
  console.log(playlistToEdit)
  const { playlistId } = useParams()
  const playlist = useSelector(storeState => storeState.playlistModule.playlist)
  const [searchResults, setSearchResults] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [imgUrl, setImgUrl] = useState(null)
  const [nameOfPlaylist, setNameOfPlaylist] = useState('tsilyalp');
  const dispatch = useDispatch()
  useEffect(() => {
    function handleResize() {
      // console.log(window.innerWidth < 960)
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
    dispatch({ type: SET_PLAYLIST, playlist: null })
    // loadPlaylist(playlistToEdit)

  }, [playlistId, setImgUrl])

  // function onSetFilter(filterBy) {
  //   console.log("filterBy", filterBy.txt)
  //   youtubeService.getVideoResults(filterBy.txt)
  //     .then(res => setSearchResults(res))
  // }
  function handleChange({ target }) {
    let { value, type, name: field } = target
    value = type === 'number' ? +value : value
    setPlaylistToEdit((prev) => ({ ...prev, [field]: value }))
  }

  const handleTextChange = (e) => {
    const childNodes = e.target.childNodes;
    let newText = '';

    for (let i = 0; i < childNodes.length; i++) {
      if (childNodes[i].nodeName === '#text') {
        newText += childNodes[i].textContent;
      }
    }

    if (newText.trim() !== '') {
      setNameOfPlaylist(newText);
    }
    setPlaylistToEdit(prev => ({ ...prev, name: newText }))
    console.log("play list to edit", playlistToEdit)
  };




  async function onSavePlaylist(ev) {
    ev.preventDefault()
    setIsEditing(false)
    try {
      const playlist = await savePlaylist(playlistToEdit)
      console.log('toy saved', playlist);
      showSuccessMsg('saved Playlist!')
      dispatch({ type: SET_PLAYLIST, playlist })
      console.log(playlist)
    }
    catch (err) {
      console.log('err', err)
      showErrorMsg('Cannot save playlist')
    }
  }

  async function onUploadImg(ev) {
    console.log("img was clicked")
    try {
      const newImgUrl = await uploadService.uploadImg(ev)
      console.log("imgurl", imgUrl)
      setPlaylistToEdit((prev) => ({ ...prev, imgUrl: newImgUrl }))
      const playlist = await savePlaylist(playlistToEdit)
      setImgUrl(newImgUrl)
      console.log(playlist.imgUrl)
      showSuccessMsg('saved img!')
    }
    catch (err) {
      console.log('err:', err)
    }
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
  const onEditImgClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.addEventListener('change', onUploadImg)
    input.click()
  }

  const toggleEditing = (e) => {
    // Only change the state if the input field loses focus due to clicking outside of it
    if (e.relatedTarget !== e.currentTarget) {
      setIsEditing(false);
    }
  };


  if (!playlist) return <section className="main-page playlist-details">
    <div className='playlist-detail-header'>

      <div className='playlist-header-img-container '>

        <img onClick={onEditImgClick} src={playlistToEdit.imgUrl} />

      </div>
      {/* <img onClick={onEditImgClick} src={playlistToEdit.imgUrl} /> */}

      <div className='playlist-detail-header-info'>
        <div className='playlist-detail-header-title-detail'>Playlist</div>

        {/* <h1 className='playlist-edit-name' contentEditable={true} onInput={handleTextChange} style={{ unicodeBidi: 'bidi-override', direction: 'rtl' }}>
          {nameOfPlaylist}
          <h1>{playlistToEdit.name}</h1>
        </h1> */}
        <h1 onClick={() => setIsEditing(true)} className='playlist-detail-header-title'>{playlistToEdit.name}</h1>
        <div className='playlist-detail-header-title-details'>Puki |  songs | 14 min 50 sec</div>
        {isEditing &&
          <form onSubmit={onSavePlaylist}>
            <input type="text"
              name="name"
              className='playlist-detail-header-title-input'
              id="name"
              placeholder="playlist name..."
              // value={playlistToEdit.name}
              onChange={handleChange}
              onBlur={toggleEditing}

            />
            <button onMouseDown={onSavePlaylist} type="submit">save</button>
          </form>}

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
    </div></section >

  const { name, songs } = playlist
  return <>
    <section className="main-page playlist-search">
      {/* <PlaylistFilter onSetFilter={onSetFilter} /> */}
    </section>

    <section className="main-page playlist-details">
      <div className='playlist-detail-header'>
        <div className='playlist-header-img-container '> <img src={songs[0].imgUrl} /></div>
        <div className='playlist-detail-header-info'>
          <div className='playlist-detail-header-title-detail'>Playlist</div>
          <h1 className='playlist-detail-header-title'>{name}</h1>
          <div className='playlist-detail-header-title-details'>Puki | {songs.length} songs | 14 min 50 sec</div>

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