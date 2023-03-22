import { store } from './store'
import { SET_CURRENT_SONG } from './player.reducer'



export async function setCurrentSong(song) {
    song = { id: 'EDwb9jOVRtU', title: 'Madonna - Hung Up (Official Video) [HD]', imgUrl: 'https://i.ytimg.com/vi/EDwb9jOVRtU/hqdefault.jpg' }
    try {
        store.dispatch({ type: SET_CURRENT_SONG, song })
    } catch (err) {
        console.log('Cannot get song', err)
        throw err
    }
}

