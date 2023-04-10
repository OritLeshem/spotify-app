// import { PlaylistListLoader } from './playlist-list-loader'
import { PlaylistPreview } from './playlist-preview'

export function PlaylistList({ playlists }) {

    return <ul className='playlist-list'>
        {playlists.map(playlist =>
            <li className='playlist-preview' key={playlist.id}>
                <PlaylistPreview playlist={playlist} />
            </li>
        )}
    </ul>
}