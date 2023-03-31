import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import { ISPLAYING, SET_CURRENT_SONG } from '../store/player.reducer';
import { PlayBtnBar, RepeatBtn, ShuffleBtn, SkipBackBtn, SkipForwardBtn } from './form';
import { youtubeService } from '../services/youtube.service';
import axios from 'axios';
const opts = {
  height: '0',
  width: '0',
  playerVars: {
    autoplay: 0,
    controls: 0,
    showinfo: 0,
    rel: 0,
  },
};

export function PlayerBar() {
  const currentSong = useSelector((storeState) => storeState.playerModule.currentSong);
  const isPlaying = useSelector((storeState) => storeState.playerModule.isPlaying);
  const playSongs = useSelector((storeState) => storeState.playlistModule.playSongs);
  const playerRef = useRef(null);
  const [time, setTime] = useState(0);
  const [userTime, setUserTime] = useState(0);
  const dispatch = useDispatch();
  const [showTime, setShowTime] = useState('00:00');
  const [duration, setDuration] = useState();

  useEffect(() => {
    if (isPlaying) {
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
    }
  }, [isPlaying, duration]);


  useEffect(() => {
    if (currentSong) {
      console.log('Video ID:', currentSong.id);
      axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${currentSong.id}&part=contentDetails&key=AIzaSyDbYtw99FWbtr4RCHxS0dxtj3--vXfSp4E`)
        .then(res => {
          console.log(res)
          setShowTime(youtubeService.formatDuration(res));
          setDuration(youtubeService.convertDurationToSeconds(res));
        })

        .catch((err) => console.error("Error fetching song duration:", err))
    }
  }, [currentSong]);

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    const updateCurrentTime = () => {
      if (playerRef.current && isPlaying) {
        setTime(Math.round(playerRef.current.getCurrentTime()));
      }
    };

    const interval = setInterval(updateCurrentTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [playerRef, isPlaying]);

  const handleChange = (event) => {
    setUserTime(parseInt(event.target.value, 10));
  };

  const handleRangeInputEnd = () => {
    setTime(userTime);
    if (playerRef.current) {
      playerRef.current.seekTo(userTime);
    }
  };

  function onReady(event) {
    setTimeout(() => {
      playerRef.current = event.target;
      if (isPlaying) {
        playerRef.current.playVideo();
      }
    }, 500);
  }

  const onPlayButtonClick = (ev) => {
    dispatch({ type: ISPLAYING });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  function handleNextSong() {
    console.log('currentSong', currentSong);
    const currIndex = playSongs.indexOf(currentSong);
    if (currIndex === playSongs.length - 1) {
      dispatch({ type: SET_CURRENT_SONG, song: playSongs[0] });
    } else {
      dispatch({ type: SET_CURRENT_SONG, song: playSongs[currIndex + 1] });
    }
    console.log('currIndex', currIndex);
  }

  return (
    <section className="player-bar">
      <div className="player-control">
        <ShuffleBtn />
        <SkipBackBtn />
        <button className='playbar-play-pause' onClick={onPlayButtonClick}>
          {isPlaying ? <span className="fa-solid pause"></span> : <PlayBtnBar onClick={onPlayButtonClick} />}
        </button>
        {currentSong && (
          <YouTube videoId={currentSong.id || '4m1EFMoRFvY'} opts={opts} onReady={onReady} />
        )}
        <button onClick={handleNextSong}>
          {' '}
          <SkipForwardBtn />
        </button>
        <RepeatBtn />
      </div>
      <div className="playback-bar">
        <small>{formatTime(time)}</small>
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max={duration}
            step="1"
            className="slider"
            value={userTime !== 0 ? userTime : time}
            onChange={handleChange}
            onMouseUp={handleRangeInputEnd}
            onTouchEnd={handleRangeInputEnd}
          />
          {/* <div className="progress" style={{ width: `${time / 2}%` }}></div> */}
          <div className="progress" style={{ width: `${(time / duration) * 100}%` }}></div>


        </div>
        <small>{showTime}</small>
      </div>
    </section>
  );
}