import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { loadPlaylists, removePlaylist } from '../store/playlist.actions'
import { CreatePlaylist, HomePageSvg, LibrarySvg, LikedSongs, Logo, SearchSvg } from './form'
import { AiOutlinePlus } from 'react-icons/ai'
import { SET_PLAYLIST } from '../store/playlist.reducer'
export function Navbar() {
  const user = useSelector(storeState => storeState.userModule.user)

  const [isMobile, setIsMobile] = useState(false)
  const [activeNav, setActiveNav] = useState('#')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  function handleHome() {
    navigate('/')
    setActiveNav('#')
  }
  function handleSearch() {
    navigate('/search')
    setActiveNav('#search')
  }
  function handleLibrary() {
    navigate('/playlist')
    setActiveNav('#playlist')
  }
  function handleCreate() {
    const newPlaylist = null
    dispatch({ type: SET_PLAYLIST, playlist: newPlaylist })
    navigate('/create')
    setActiveNav('#create')
  }
  useEffect(() => {
    function handleResize() {
      // console.log(window.innerWidth < 960)
      if (window.innerWidth < 960) setIsMobile(true)
      if (window.innerWidth > 960) setIsMobile(false)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const playlists = useSelector(storeState => storeState.playlistModule.playlists)
  useEffect(() => {
    loadPlaylists()
    // console.log(playlists)
  }, [])

  // const playlists = ['My First List', 'Pop Songs List']
  function onRemovePlaylist(ev, playlistId) {
    console.log('removePlaylist', playlistId)
    removePlaylist(playlistId)
    navigate('/search')
  }
  if (!isMobile) return <section className='navbar'>

    <Logo />

    <nav>
      <NavLink to='/'><HomePageSvg /><h3>Home</h3></NavLink>
      <NavLink to='/search'><SearchSvg /><h3>Search</h3></NavLink>
      <NavLink to='/playlist'><LibrarySvg /><h3>Your Library</h3></NavLink>
    </nav>
    <div className='preferences'>
      <NavLink onClick={handleCreate} to='/create'><CreatePlaylist /><h3>Create Playlist</h3></NavLink>
      <NavLink to='/like'><LikedSongs /><h3>Liked Songs</h3></NavLink>
    </div>
    <div className='divider'></div>

    <div className='navbar-playlists'>
      {user && playlists && playlists.filter(playlist => playlist.createdBy._id === user._id).map(playlist => <div className='navbar-playlist'>
        <NavLink to={`/detail/${playlist._id}`} key={playlist._id}>
          <h5>{playlist.name}</h5></NavLink>
        <small onClick={(ev) => onRemovePlaylist(ev, playlist._id)} className='fa-regular trash-can'></small>
      </div>
      )}
    </div>

  </section>
  if (isMobile) return <nav className='nav-mobile'>
    <button onClick={handleHome} className={activeNav === '#' ? 'active' : ''}><HomePageSvg /></button>
    <button onClick={handleSearch} className={activeNav === '#search' ? 'active' : ''}><SearchSvg /></button>
    <button onClick={handleLibrary} className={activeNav === '#playlist' ? 'active' : ''}><LibrarySvg /></button>
    <button onClick={handleCreate} className={activeNav === 'create-btn #create' ? 'active' : 'create-btn'}><AiOutlinePlus /></button>
  </nav>
}

