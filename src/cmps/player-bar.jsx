import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import { ISPLAYING } from '../store/player.reducer';
// import { SET_CURRENT_SONG, INCREMENT } from '../store/player.reducer';

import { PlayBtnBar, RepeatBtn, ShuffleBtn, SkipBackBtn, SkipForwardBtn } from "./form";

export function PlayerBar() {
    const [time, setTime] = useState(0)
    const playerRef = useRef(null);
    const currentSong = useSelector(storeState => storeState.playerModule.currentSong)
    const isPlaying = useSelector(storeState => storeState.playerModule.isPlaying)
    const dispatch = useDispatch()

    function handleChange({ target }) {
        setTime(target.value)
    }

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
        playerRef.current = event.target;
    };

    const onPlayButtonClick = () => {
        console.log("music play button clicked", currentSong)
        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
        // setIsPlaying(!isPlaying);
        dispatch({ type: ISPLAYING }); // Dispatch action to update current song
    };

    return <section className="player-bar">
        <div className="player-control">
            <ShuffleBtn />
            <SkipBackBtn />

            <button onClick={onPlayButtonClick}>
                {isPlaying ? <span className='fa-solid pause'></span> : <PlayBtnBar />}
            </button>
            <YouTube videoId={currentSong.id || "4m1EFMoRFvY"} opts={opts} onReady={onReady} />


            {/* <PlayBtnBar /> */}

            <SkipForwardBtn />
            <RepeatBtn />
        </div>
        <div className="playback-bar">
            <small>0:00</small>
            <div className="slider-container">
                <input type="range"
                    min="0"
                    max="200"
                    step="5"
                    className="slider"
                    value={time}
                    onChange={handleChange} />
                <div className="progress" style={{ width: `${time / 2}%` }}></div>
            </div>
            <small>3:20</small>
        </div>
    </section>
}