import { Link } from 'react-router-dom'
import { PlayBtn } from './form'

export function PlaylistPreview({ playlist }) {

    return <>
        <div className="img-container">
            <img src={playlist.imgUrl} alt="" />
            <PlayBtn />
        </div>
        <div>
            <span>{playlist.name}</span>
            <h5>{playlist.description}</h5>
        </div>
    </>
}

