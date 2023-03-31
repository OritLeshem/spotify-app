import { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import { ISPLAYING, SET_CURRENT_SONG } from '../store/player.reducer';
import { PlayBtnBar, RepeatBtn, ShuffleBtn, SkipBackBtn, SkipForwardBtn } from "./form";
import { youtubeService } from "../services/youtube.service";

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

export function PlayerBar() {

  const currentSong = useSelector(storeState => storeState.playerModule.currentSong)
  const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
  const playSongs = useSelector(storeState => storeState.playlistModule.playSongs)
  const playerRef = useRef(null)
  const [time, setTime] = useState(0)
  const dispatch = useDispatch()
  const [showTime, setShowTime] = useState()
  const [duration, setDuration] = useState()

  useEffect(() => {

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime < duration) {
          return prevTime + 1;
        }
        return 0;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    youtubeService.getTimeOfSong()
      .then(res => {
        setShowTime(youtubeService.formatDuration(res))
        setDuration(youtubeService.convertDurationToSeconds(res))
      })
  }, [])


  const handleChange = (event) => {
    setTime(parseInt(event.target.value, 10));
  }

  function onReady(event) {
    setTimeout(() => {
      playerRef.current = event.target;
      if (isPlaying) {
        playerRef.current.playVideo()
      }
      if (playerRef.current && isPlaying) {
        playerRef.current.playVideo()
      }
    }, 500)
  }

  if (playerRef.current && !isPlaying) {
    playerRef.current.pauseVideo()
  }

  if (playerRef.current && isPlaying) {
    playerRef.current.playVideo()
  }

  const onPlayButtonClick = (ev) => {
    const test = String(ev.target)
    if (!isPlaying && playerRef) {
      playerRef.current.pauseVideo()
    }
    if (isPlaying && playerRef && test.includes('Span')) {
      playerRef.current.playVideo()
    }
    dispatch({ type: ISPLAYING })
  }
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  function handleNextSong() {
    console.log("currentSong", currentSong)
    const currIndex = playSongs.indexOf(currentSong)
    if (currIndex === playSongs.length - 1) dispatch({ type: SET_CURRENT_SONG, song: playSongs[0] })
    else dispatch({ type: SET_CURRENT_SONG, song: playSongs[currIndex + 1] })
    console.log("currIndex", currIndex)
  }

  return <section className="player-bar">
    <div className="player-control">
      <ShuffleBtn />
      <SkipBackBtn />
      <button onClick={onPlayButtonClick}>
        {isPlaying ? <span className='fa-solid pause'></span> : <PlayBtnBar />}
      </button>
      {currentSong && <YouTube videoId={currentSong.id || "4m1EFMoRFvY"} opts={opts} onReady={onReady} />}
      {/* <PlayBtnBar /> */}
      <button onClick={handleNextSong}> <SkipForwardBtn /></button>
      {/* <SkipForwardBtn /> */}
      <RepeatBtn />
    </div>
    <div className="playback-bar">
      <small>{formatTime(time)}</small>
      <div className="slider-container">
        <input type="range"
          min="0"
          max="200"
          step="1"
          className="slider"
          value={time}
          onChange={handleChange} />
        <div className="progress" style={{ width: `${time / 2}%` }}></div>
      </div>
      <small>{showTime}</small>
    </div>
  </section>
}