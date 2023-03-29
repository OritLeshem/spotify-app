import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import defaultPhoto from '../assets/imgs/add-pic.png'


import { playlistService } from '../services/playlist.service.local'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { utilService } from '../services/util.service';
import { loadPlaylist, loadPlaylists, savePlaylist, updatePlaylist } from '../store/playlist.actions';
import { SET_PLAYLIST } from '../store/playlist.reducer'
import { useDispatch, useSelector } from 'react-redux';
import { uploadService } from '../services/upload.service';



export function PlaylistEdit() {
  const [playlistToEdit, setPlaylistToEdit] = useState(playlistService.getEmptyPlaylist())
  // console.log(playlistToEdit.imgUrl === defaultPhoto)
  const { playlistId } = useParams()
  const playlist = useSelector(storeState => storeState.playlistModule.playlist)
  const [isEditing, setIsEditing] = useState(false)
  const [imgUrl, setImgUrl] = useState(null)
  const [nameOfPlaylist, setNameOfPlaylist] = useState('tsilyalp');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: SET_PLAYLIST, playlist: null })
    if (playlist) loadPlaylist(playlist)
  }, [imgUrl])





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
      console.log('playlist saved', playlist);
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
    try {
      const newImgUrl = await uploadService.uploadImg(ev)
      setPlaylistToEdit((prev) => ({ ...prev, imgUrl: newImgUrl }))
      const playlist = await savePlaylist(playlistToEdit)
      dispatch({ type: SET_PLAYLIST, playlist })
      setImgUrl(newImgUrl)
      showSuccessMsg('saved img!')
    }
    catch (err) {
      console.log('err:', err)
    }
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

      <div className='playlist-detail-header-info'>
        <div className='playlist-detail-header-title-detail'>Playlist</div>

        {/* <h1 className='playlist-edit-name' contentEditable={true} onInput={handleTextChange} style={{ unicodeBidi: 'bidi-override', direction: 'rtl' }}>
          {nameOfPlaylist}
          <h1>{playlistToEdit.name}</h1>
        </h1> */}
        <h1 onClick={() => setIsEditing(true)} className='playlist-detail-header-title'>{playlistToEdit.name}</h1>
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
  </section >

  const { name, songs } = playlist
  return <>
    <section className="main-page playlist-search">
      {/* <PlaylistFilter onSetFilter={onSetFilter} /> */}
    </section>

    <section className="main-page playlist-details">
      <div className='playlist-detail-header'>
        <div className='playlist-header-img-container '> <img src={playlistToEdit.imgUrl === defaultPhoto ? songs[0].imgUrl : playlistToEdit.imgUrl} /></div>
        <div className='playlist-detail-header-info'>
          <h1 className='playlist-detail-header-title'>{name}</h1>

        </div>
      </div>






    </section>
  </>
}