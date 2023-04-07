import { store } from './store'
import { SET_CURRENT_SONG, SET_PLAYER } from './player.reducer'

export async function setCurrentSong(song) {
    try {
        store.dispatch({ type: SET_CURRENT_SONG, song })
    } catch (err) {
        console.log('Cannot get song', err)
        throw err
    }
}

export async function loadPlayer(player) {
    console.log('LOADING PLAYER')
    try {
        store.dispatch({ type: SET_PLAYER, player })
    } catch (err) {
        console.log('Cant load player', err)
    }
}