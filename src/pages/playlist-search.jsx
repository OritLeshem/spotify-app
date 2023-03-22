import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadPlaylists, removePlaylist } from '../store/playlist.actions'
import { PlaylistList } from '../cmps/playlist-list'
import { SET_FILTER } from '../store/playlist.reducer'
import { youtubeService } from '../services/youtube.service'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { PlaylistFilter } from '../cmps/playlist-filter'
import { GenreList } from '../cmps/genre-list'
import { AppDivider, PlayBtn } from '../cmps/form'
// import { Music } from '../cmps/music'

export function PlaylistSearch() {
  const playlists = useSelector(storeState => storeState.playlistModule.playlists)
  const filterBy = useSelector(storeState => storeState.playlistModule.filterBy)
  const dispatch = useDispatch()
  const [searchResults, setSearchResults] = useState(null)

  useEffect(() => {
    onLoadPlaylists(filterBy)
  }, [filterBy])

  async function onLoadPlaylists(filterBy) {
    try {
      await loadPlaylists(filterBy)
    } catch (err) {
      showErrorMsg('Cannot load playlists', err)
    }
  }

  function onSetFilter(filterBy) {
    console.log("filterBy", filterBy.txt)
    youtubeService.getVideoResults(filterBy.txt)
      .then(res => setSearchResults(res))

    dispatch({ type: SET_FILTER, filterBy })
  }

  console.log('searchResults:', searchResults)

  if (!playlists) return
  return <section className="main-page playlist-search">
    <PlaylistFilter onSetFilter={onSetFilter} />

    {searchResults && <>
      <h2>Songs</h2>
      <ul className="song-list">
        {searchResults.map(result =>
          <li className="song-preview" key={result.id}>
            <div className="img-container">
              <img src={result.imgUrl} alt="" />
              {/* <Music song={result} songId={result.id || '4m1EFMoRFvY'} /> */}
            </div>
            <div className="cover-container"></div>
            <h5>{result.title}</h5>
          </li>)}
      </ul>
    </>}
    {/* <PlaylistList playlists={playlists} onRemovePlaylist={onRemovePlaylist}
            onEditPlaylist={onEditPlaylist} /> */}
    {!searchResults && <>
      <h2>Browse all</h2>
      <GenreList />
      <AppDivider />
    </>}
  </section>
} 