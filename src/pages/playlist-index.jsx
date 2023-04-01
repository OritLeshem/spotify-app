import { PlaylistList } from '../cmps/playlist-list'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { loadPlaylists } from '../store/playlist.actions';
import { Link } from 'react-router-dom'
// import { PlayBtn } from './form'


export function PlaylistIndex() {
  const playlists = useSelector(storeState => storeState.playlistModule.playlists)
  useEffect(() => {
    loadPlaylists()
  }, [])

  return <section className="main-page home-page">
    {/* <Music /> */}
    <h2 className='home-page-title'>PLAYLISTS</h2>
    <ul className="playlist-list">
      {playlists.map(playlist =>
        <li className="playlist-preview" key={playlist.id}>
          <Link to={`/detail/${playlist._id}`}>
            <div className="img-container-preview ">
              <img src={playlist.imgUrl} alt="" />
              {/* <PlayBtn /> */}
            </div>
            <div>
              <span>{playlist.name.substring(0, playlist.name.indexOf("-" || ":")) || playlist.name.slice(0, 20)}{playlist.name.length > 20 && "..."}</span>

              <h5 >{playlist.name.slice((playlist.name.indexOf('-' || ':') + 2), playlist.name.length + 1).slice(0, 15)}{playlist.name.length > 15 && "..."}</h5>        </div>
          </Link>
        </li>
      )}
    </ul>

  </section >
}