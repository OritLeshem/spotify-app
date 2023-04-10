import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { LikeBtn } from './form'

export function SongDisplay() {
    const currentSong = useSelector(storeState => storeState.playerModule.currentSong)
    const [isMobile, setIsMobile] = useState(false)

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
    return <section className='song-display'>
        {currentSong && <img src={currentSong.imgUrl} alt='' />}
        <div>
            {/* <h5>{currentSong.title}</h5> */}
            <h5 title={currentSong && currentSong.title}>{currentSong && currentSong.title.slice((currentSong?.title.indexOf('-' || ':') + 1), currentSong?.title.length + 1).slice(0, 15)}{currentSong?.title.length > 15 && '...'}</h5>
            <small>{currentSong && currentSong.title.substring(0, currentSong.title.indexOf('-' || ':'))}</small>
        </div>
        {!isMobile && <LikeBtn />}
    </section>
}
