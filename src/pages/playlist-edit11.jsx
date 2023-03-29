import { useState } from 'react'
import defaultPhoto from '../assets/imgs/add-pic.png'
import { EditModal } from '../cmps/edit-modal'
import { playlistService } from '../services/playlist.service.local'

export function PlaylistEdit() {
  const [playlistToEdit, setPlaylistToEdit] = useState(playlistService.getEmptyPlaylist())

  return <section className="main-page playlist-details">
    <form action="">

      <div className='playlist-detail-header'>
        <div className='playlist-header-img-container '>
          <img src={defaultPhoto} />
        </div>

        <div className='playlist-detail-header-info'>
          <div className='playlist-detail-header-title-detail'>Playlist</div>
          <input
            placeholder='your playlist name'
            type="text" />
          <div className='playlist-detail-header-title-details'>Puki |  songs | 14 min 50 sec</div>

          <button type="submit">create</button>
        </div>
      </div>
    </form>
  </section>
}