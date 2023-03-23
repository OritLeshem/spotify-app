import { useSelector } from 'react-redux'
import { LikeBtn } from './form'

export function SongDisplay() {
    const currentSong = useSelector(storeState => storeState.playerModule.currentSong)

    return <section className="song-display">
        {currentSong && <img src={currentSong.imgUrl} alt="" />}
        <div>
            <h5>{currentSong.title}</h5>
            <small>{currentSong.title}</small>
        </div>
        <LikeBtn />
    </section>
}
