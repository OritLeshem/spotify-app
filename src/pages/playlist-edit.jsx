import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiFillClockCircle } from "react-icons/ai";
import defaultPhoto from '../assets/imgs/add-pic.png'


import { playlistService } from '../services/playlist.service.local'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { utilService } from '../services/util.service';
import { addSonfToPlaylist, loadPlaylist, loadPlaylists, removeSongFromPlayList, savePlaylist, updatePlaylist } from '../store/playlist.actions';
import { SET_PLAYLIST } from '../store/playlist.reducer'
import { useDispatch, useSelector } from 'react-redux';
import { uploadService } from '../services/upload.service';



export function PlaylistEdit() {
  const [playlistToEdit, setPlaylistToEdit] = useState(playlistService.getEmptyPlaylist())
  // console.log(playlistToEdit.imgUrl === defaultPhoto)
  const playlists = useSelector(storeState => storeState.playlists)
  const playlist = useSelector(storeState => storeState.playlistModule.playlist)
  const [isMobile, setIsMobile] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [imgUrl, setImgUrl] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: SET_PLAYLIST, playlist: null })
    if (playlist) loadPlaylist(playlist)
  }, [imgUrl])

  useEffect(() => {

    if (playlist) loadPlaylists('')
  }, [playlist])

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

  function handleChange({ target }) {
    let { value, type, name: field } = target
    value = type === 'number' ? +value : value
    setPlaylistToEdit((prev) => ({ ...prev, [field]: value }))
  }


  async function onSavePlaylist(ev) {
    ev.preventDefault()
    setIsEditing(false)
    try {
      const playlist = await savePlaylist(playlistToEdit)
      showSuccessMsg('saved Playlist!')
      dispatch({ type: SET_PLAYLIST, playlist })
      console.log(imgUrl === defaultPhoto, imgUrl, defaultPhoto)
      navigate(`/detail/${playlist._id}`)
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


  return <section className="main-page playlist-details">
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

        <form onSubmit={onSavePlaylist}>
          <input type="text"
            name="name"
            className='playlist-detail-header-title-input'
            id="name"
            placeholder="playlist name..."
            // value={playlistToEdit.name}
            onChange={handleChange}

          />
          <button onMouseDown={onSavePlaylist} type="submit">save</button>
        </form>

      </div>
    </div>
  </section >

}