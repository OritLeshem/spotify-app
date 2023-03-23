import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import { showErrorMsg } from '../services/event-bus.service';
import { SET_CURRENT_SONG, INCREMENT, ISPLAYING } from '../store/player.reducer';


export const Music = ({ songId, song, startTime = 0 }) => {
  // console.log("song", song)
  // const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);
  const currentSong = useSelector(storeState => storeState.playerModule.currentSong)
  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
  const dispatch = useDispatch();


  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0,
      controls: 0,
      showinfo: 0,
      rel: 0,
    },
  }

  const onReady = (event) => {
    playerRef.current = event.target
  }

  const onPlayButtonClick = () => {
    console.log("music play button clicked", song)
    if (isPlaying) {
      playerRef.current.pauseVideo()
      playerRef.current.getCurrentTime()
    } else {
      playerRef.current.playVideo()
    }
    // setIsPlaying(!isPlaying);
    dispatch({ type: SET_CURRENT_SONG, song }); // Dispatch action to update current song
    dispatch({ type: ISPLAYING }); // Dispatch action to update current song
  }
  const handleReady = (event) => {
    const player = event.target;
    player.seekTo(startTime);
    playerRef.current = player;
  };


  return <section className="music">
    <button onClick={onPlayButtonClick}>
      {isPlaying ?
        <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon">
          <path fill="currentcolor" d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
        </svg>
        :
        <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon">
          <path fill="currentcolor" d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
        </svg>}
    </button>
    {/* <YouTube videoId="GTxPUFWjOlQ" opts={opts} onReady={onReady} /> */}
    <YouTube videoId={songId} opts={opts} onReady={handleReady} />
  </section>
}

