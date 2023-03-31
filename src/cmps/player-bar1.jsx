import { useEffect, useState, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import { ISPLAYING, SET_CURRENT_SONG } from '../store/player.reducer';
import { PlayBtnBar, RepeatBtn, ShuffleBtn, SkipBackBtn, SkipForwardBtn } from "./form";
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

    function handleChange({ target }) {
        setTime(target.value)
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