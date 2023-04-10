import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { playlistService } from '../services/playlist.service'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { uploadService } from '../services/upload.service';

import { loadPlaylist, loadPlaylists, savePlaylist } from '../store/playlist.actions';
import { SET_PLAYLIST } from '../store/playlist.reducer'


export function PlaylistEdit() {
  const [playlistToEdit, setPlaylistToEdit] = useState(playlistService.getEmptyPlaylist())
  const user = useSelector(storeState => storeState.userModule.user)

  console.log(playlistToEdit)
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
    setPlaylistToEdit((prev) => ({ ...prev, [field]: value, createdBy: { ...user } }))
  }


  async function onSavePlaylist(ev) {
    ev.preventDefault()
    setIsEditing(false)
    try {
      const playlist = await savePlaylist(playlistToEdit)
      showSuccessMsg('saved Playlist!')
      dispatch({ type: SET_PLAYLIST, playlist })
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

  if (!user) return <span className='main-page playlist-details'>Please signup / login to create a playlist</span>
  else return <section className='main-page playlist-details'>
    <div className='playlist-detail-header'>

      <div className='playlist-header-img-container '>

        <img onClick={onEditImgClick} src={playlistToEdit.imgUrl} />

      </div>

      <div className='playlist-detail-header-info'>
        <div className='playlist-detail-header-title-detail'>Playlist</div>


        <h1 onClick={() => setIsEditing(true)} className='playlist-detail-header-title'>{playlistToEdit.name}</h1>

        <form onSubmit={onSavePlaylist}>
          <input type='text'
            name='name'
            className='playlist-detail-header-title-input'
            id='name'
            placeholder='playlist name...'
            onChange={handleChange}
          />
          <button className='save-new-playlist' onMouseDown={onSavePlaylist} type='submit'>Save</button>
        </form>

      </div>
    </div>
  </section >

}