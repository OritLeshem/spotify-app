import { useEffect, useState, useRef } from 'react'
import { loadPlayer } from '../store/player.actions'

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
    // const player = useSelector(storeState => storeState.playerModule.player)
    const playSongs = useSelector(storeState => storeState.playlistModule.playSongs)
    console.log(isPlaying)
    // const playerRef = useRef(null)
    const [player, setPlayer] = useState(null)
    const [time, setTime] = useState(0)
    const dispatch = useDispatch()

    useEffect(() => {
        if (player !== null) console.dir(player.i)
        if (player === null) return
        if (player?.i === null) return

        if (player?.i && !isPlaying) {
            player.pauseVideo()

        }

        if (player?.i && isPlaying) {
            player.playVideo()
        }
    }, [player, isPlaying])


    function handleChange({ target }) {
        setTime(target.value)
    }

    function onReady(event) {
        console.log("event.target", event.target)
        setPlayer(event.target)
        // loadPlayer(event.target)
        if (player === null) return

        console.log(isPlaying, "HEEELLO", player)
        if (event.target.i !== null && isPlaying) {
            player.playVideo()
        }
        if (event.target.i !== null && !isPlaying) {
            player.pauseVideo()
        }
    }

    const onPlayButtonClick = (ev) => {
        const test = String(ev.target)
        console.log("TESSSSST", test, test.includes('Span'))
        if (!isPlaying && player) {
            player.pauseVideo()
        }
        if (isPlaying && player && test.includes('Span')) {
            player.playVideo()
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