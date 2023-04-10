import { useSelector } from 'react-redux';
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { loadPlaylists, removePlaylist } from '../store/playlist.actions';

import { PlayBtn } from '../cmps/form'

export function PlaylistIndex() {
  const user = useSelector(storeState => storeState.userModule.user)
  let playlists = useSelector(storeState => storeState.playlistModule.playlists)
  const navigate = useNavigate()
  useEffect(() => {
    loadPlaylists()
    console.log(playlists)
  }, [])
  function onRemovePlaylist(ev, playlistId) {
    ev.stopPropagation();

    console.log('removePlaylist', playlistId)
    removePlaylist(playlistId)
    // navigate('/search')
  }

  if (!user) return <span className='main-page playlist-details'>Please signup / login to create a playlist</span>
  else return <section className='main-page home-page'>
    <h2 className='home-page-title'>PLAYLISTS</h2>
    <ul className='playlist-index'>
      {user && playlists && playlists && playlists.filter(playlist => playlist.createdBy._id === user._id).map(playlist =>
        <li className='playlist-preview' key={playlist.id}>
          <small onClick={(ev) => onRemovePlaylist(ev, playlist._id)} className='trash'>X</small>

          <Link to={`/detail/${playlist._id}`}>
            <div className='img-container-preview '>
              <img src={playlist.imgUrl} alt='' />
              <PlayBtn />
            </div>
            <div>
              <span>{playlist.name.substring(0, playlist.name.indexOf('-' || ':')) || playlist.name.slice(0, 20)}{playlist.name.length > 20 && '...'}</span>
              <h5 >{playlist.name.slice((playlist.name.indexOf('-' || ':') + 1), playlist.name.length + 1).slice(0, 15)}{playlist.name.length > 15 && '...'}</h5>        </div>
          </Link>
        </li>
      )}
    </ul>
  </section >
}