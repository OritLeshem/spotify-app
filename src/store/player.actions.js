import { store } from './store'
import { SET_CURRENT_SONG } from './player.reducer'



export async function setCurrentSong(song) {
    try {
        store.dispatch({ type: SET_CURRENT_SONG, song })
    } catch (err) {
        console.log('Cannot get song', err)
        throw err
    }
}

