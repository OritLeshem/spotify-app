import { Link } from 'react-router-dom'
import { PlayBtn } from './form'

export function PlaylistPreview({ playlist }) {

    return <Link to={`/genre/${playlist.name.substring(0, playlist.name.indexOf('-' || ':' || ',')) || playlist.name.slice(0, 20)}`}>
        <div className='img-container-preview '>
            <img src={playlist.imgUrl} alt='' />
            <PlayBtn />
        </div>
        <div>
            <span>{playlist.name.substring(0, playlist.name.indexOf('-' || ':' || ',')) || playlist.name.slice(0, 20)}{playlist.name.length > 20 && '...'}</span>
            <h5 >{playlist.name.slice((playlist.name.indexOf('-' || ':' || ',') + 1), playlist.name.length + 1).slice(0, 15)}{playlist.name.length > 15 && '...'}</h5>        </div>
    </Link>
}

