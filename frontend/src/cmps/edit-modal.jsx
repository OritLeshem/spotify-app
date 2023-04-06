import defaultPhoto from '../assets/imgs/add-pic.png'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { SET_PLAYLIST, UPDATE_NAME_PLAYLIST, UPDATE_PLAYLIST } from '../store/playlist.reducer';
import { editNameOfPlayList, loadPlaylist, savePlaylist, updateGig, updateNaneOfPlayList } from '../store/playlist.actions';
import { useParams } from 'react-router-dom';
import { playlistService } from '../services/playlist.service'


export function EditModal({ onCloseEditModal }) {
  const dispatch = useDispatch()
  let playlist = useSelector(storeState => storeState.playlistModule.playlist)
  const [playlistToEdit, setPlaylistToEdit] = useState(playlist)
  const { playlistId } = useParams()

  function handleChange({ target }) {
    console.log(target.value)
    setPlaylistToEdit((prev) => ({ ...prev, name: target.value }))
  }



  async function onSubmit(ev) {
    ev.preventDefault()
    console.log("submit was clicked")
    updateNaneOfPlayList(playlistId, playlistToEdit.name)
    // let savedPlaylist = await playlistService.save({ ...playlist, nane: playlistToEdit.name })
    // dispatchEvent({ type: UPDATE_NAME_PLAYLIST, playlist: playlistToEdit })


    // await updateGig(playlistToEdit)
    // await loadPlaylist(playlistToEdit)


    // console.log(playlistToEdit)

    // try {
    //   const playlist = await editNameOfPlayList(playlistId, playlistToEdit.name)
    //   console.log('playlist saved', playlist);
    //   // showSuccessMsg('saved Playlist!')
    //   dispatch({ type: SET_PLAYLIST, playlist })
    //   console.log(playlist)
    // }
    // catch (err) {
    //   console.log('err', err)
    //   // showErrorMsg('Cannot save playlist')
    // }



  }
  return <div className='edit-modal'>
    <button onClick={() => onCloseEditModal()}>x</button>
    <form submit={onSubmit}>
      <div className='playlist-header-img-container '>
        <img src={defaultPhoto} />
      </div>

      <div className='playlist-detail-header-info'>
        <h1>{playlistToEdit.name}</h1>
        <input
          className="edit-name-input"
          placeholder='your playlist name'
          type="text"
          name="name"
          onChange={handleChange}


        />

        <button onMouseDown={onSubmit} type="submit">create</button>

      </div>
    </form>
  </div >

}
