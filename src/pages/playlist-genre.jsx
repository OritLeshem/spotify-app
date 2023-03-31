import { useEffect, useState } from "react"
import { AiFillClockCircle } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Music } from "../cmps/music"
import { youtubeService } from "../services/youtube.service"
import { ISPLAYING, SET_CURRENT_SONG } from "../store/player.reducer"

export function PlaylistGenre() {
  const { genreName } = useParams()
  const dispatch = useDispatch()
  const currentSong = useSelector(storeState => storeState.playerModule.currentSong)
  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
  const [isMobile, setIsMobile] = useState(false)

  let [searchResults, setSearchResults] = useState(null)
  useEffect(() => {
    async function fetchVideoResults() {
      const results = await youtubeService.getVideoResults(genreName)
      setSearchResults(results)
    }
    fetchVideoResults()
  }, [genreName])
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
  function handlePlayPauseClick(song) {
    dispatch({ type: SET_CURRENT_SONG, song })
    if (song.id !== currentSong.id) {
      dispatch({ type: ISPLAYING, isPlaying: true })
    } else {
      dispatch({ type: ISPLAYING, isPlaying: !isPlaying })
    }
  }
  function handleSong(ev, songId) {
    console.log("song, li clicked", songId);
  }

  return <section className="main-page playlist-details">    <h2> {genreName}</h2>
    <div className="headline-table-title">
      <div className="header-row">
        <div className="headline-table-col">
          <span>#</span>
        </div>
        <div className="headline-table-col">
          <span>TITLE</span>
        </div>

      </div>
    </div>

    {searchResults && <ul className='playlist-detail-result-list'>{searchResults?.map((song, index) => <li key={song.id} className='song' onClick={() => handleSong(song.id)}  >
      <div className="headline-table-col table-num">{index + 1}
      </div>
      <div className="headline-table-col song-detail">
        <div className="table-img-container">
          <img src={song.imgUrl} alt="song" />
          <Music handlePlayPauseClick={handlePlayPauseClick} song={song} songId={song.id || '4m1EFMoRFvY'} />
        </div>
        <div className="cover-container"></div>
        <div className='song-info'>
          {(!isMobile) ? <small title={song.title}>{song.title.slice((song.title.indexOf('-' || ':') + 2), song.title.length + 1).slice(0, 30)}{song.title.length > 30 && "..."}</small> : <small title={song.title}>{song.title.slice((song.title.indexOf('-' || ':') + 2), song.title.length + 1).slice(0, 15)}{song.title.length > 15 && "..."}</small>}
          <small>{song.title.substring(0, song.title.indexOf("-" || ":"))}</small>
        </div>
      </div>

    </li>)}
    </ul>}



  </section>
}