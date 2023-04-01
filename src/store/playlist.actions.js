import { store } from './store'
import { SET_PLAYLIST, ADD_SONG_TO_PLAYLIST, REMOVE_SONG_FROM_PLAYLIST, ADD_PLAYLIST, REMOVE_PLAYLIST, SET_PLAYLISTS, UNDO_REMOVE_PLAYLIST, UPDATE_PLAYLIST, UPDATE_NAME_PLAYLIST, SET_SONGS_LIST } from './playlist.reducer'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { playlistService } from '../services/playlist.service.local'
// import { playlistService } from '../services/playlist.service'

// Action Creators:
export function getActionRemovePlaylist(playlistId) {
    return { type: REMOVE_PLAYLIST, playlistId }
}
export function getActionRemoveSongFromPlaylist(playlist, songId) {
    return { type: REMOVE_SONG_FROM_PLAYLIST, playlist }
}
export function getActionAddPlaylist(playlist) {
    return { type: ADD_PLAYLIST, playlist }
}
export function getActionUpdatePlaylist(playlist) {
    return { type: UPDATE_PLAYLIST, playlist }
}

export async function loadPlaylists(filterBy) {
    try {
        const playlists = await playlistService.query(filterBy)
        store.dispatch({ type: SET_PLAYLISTS, playlists })
    } catch (err) {
        console.log('Cannot load playlists', err)
        throw err
    }
}

export async function loadPlaylist(playlistId) {
    try {
        const playlist = await playlistService.getById(playlistId)
        store.dispatch({ type: SET_PLAYLIST, playlist })
        store.dispatch({ type: SET_SONGS_LIST, playSongs: playlist.songs })
    } catch (err) {
        console.log('cannot load playlist', err)
        throw err
    }
}

export async function removePlaylist(playlistId) {
    try {
        await playlistService.remove(playlistId)
        store.dispatch(getActionRemovePlaylist(playlistId))
    } catch (err) {
        console.log('Cannot remove playlist', err)
        throw err
    }
}


export async function addPlaylist(playlist) {
    try {
        const savedPlaylist = await playlistService.save(playlist)
        console.log('Added Playlist', savedPlaylist)
        store.dispatch(getActionAddPlaylist(savedPlaylist))
        return savedPlaylist
    } catch (err) {
        console.log('Cannot add playlist', err)
        throw err
    }
}


export async function updatePlaylist(playlist) {
    try {
        const savedPlaylist = await playlistService.save(playlist)
        console.log('Updated Playlist:', savedPlaylist)
        store.dispatch(getActionUpdatePlaylist(savedPlaylist))
        return savedPlaylist
    } catch (err) {
        console.log('Cannot save playlist', err)
        throw err
    }
}

// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export async function onRemovePlaylistOptimistic(playlistId) {
    store.dispatch({ type: REMOVE_PLAYLIST, playlistId })
    showSuccessMsg('Playlist removed')
    try {
        await playlistService.remove(playlistId)
        console.log('Server Reported - Deleted Succesfully')
    } catch (err) {
        showErrorMsg('Cannot remove playlist')
        console.log('Cannot load playlists', err)
        store.dispatch({ type: UNDO_REMOVE_PLAYLIST, })
    }
}
// Song in playlist

export async function addSonfToPlaylist(playlistId, newSong) {
    try {
        let newPlaylist = await playlistService.getById(playlistId)
        newPlaylist = { ...newPlaylist, songs: [...newPlaylist.songs, newSong] }
        const savedPlaylist = await playlistService.save(newPlaylist)
        console.log('Added Playlist', savedPlaylist)
        showSuccessMsg('song added succesfully')
        store.dispatch({ type: ADD_SONG_TO_PLAYLIST, playlist: savedPlaylist })
        return savedPlaylist
    } catch (err) {
        console.log('Cannot add playlist', err)
        throw err
    }
}

export async function removeSongFromPlayList(playlistId, songId) {
    try {
        let playlist = await playlistService.getById(playlistId)
        let removedSong = playlist.songs.filter(song => song.id !== songId)
        playlist = { ...playlist, songs: removedSong }
        await playlistService.save(playlist)
        store.dispatch(getActionRemoveSongFromPlaylist(playlist))
        console.log(playlist.songs.length)
    } catch (err) {
        console.log('Cannot remove playlist', err)
        throw err
    }
}

export async function editNameOfPlayList(playlistId, newName) {
    console.log(typeof (playlistId), newName)
    try {
        console.log("first")
        const playlist = await playlistService.getById(playlistId)
        let newPlaylist = { ...playlist, name: newName }
        console.log("NEW", newPlaylist)
        await playlistService.save(newPlaylist)

        store.dispatch({ type: UPDATE_PLAYLIST, playlist: newPlaylist })
    } catch (err) {
        console.log('Cannot remove playlist', err)
        throw err
    }
}

export async function savePlaylist(playlist) {
    console.log(playlist._id, playlist.name)
    const type = (playlist._id) ? UPDATE_PLAYLIST : ADD_PLAYLIST
    console.log(playlist._id, playlist.name, type)
    try {
        const savedPlaylist = await playlistService.save(playlist)
        console.log("savedPlaylist", savedPlaylist)

        store.dispatch({ type, playlist: savedPlaylist })
        return savedPlaylist
    }
    catch (err) {
        console.error('Cannot save playlist:', err)
        throw err
    }
}


// export async function updateNaneOfPlayList(playlistId, newName) {
//     console.log(playlistId, newName)
//     try {
//         let playlist = await playlistService.getById(playlistId)
//         console.log("pp", playlist)
//         await playlistService.save({ ...playlist, name: newName })
//         store.dispatch(getActionUpdateNameOfPlaylist(playlist, newName))
//         console.log(playlist.songs.length)
//     } catch (err) {
//         console.log('Cannot remove playlist', err)
//         throw err
//     }
// }

export function updateNaneOfPlayList(playlistId, newName) {
    console.log(playlistId, newName)
    playlistService.getById(playlistId)
        .then(playlist => {
            console.log("pp", playlist)
            return playlistService.save({ ...playlist, name: newName })
        })
        .then(updatedPlaylist => {
            store.dispatch(getActionUpdateNameOfPlaylist(updatedPlaylist, newName))
            console.log(updatedPlaylist.songs.length)
        })
        .catch(err => {
            console.log('Cannot remove playlist', err)
            throw err
        })
}

export function getActionUpdateNameOfPlaylist(playlist, newName) {
    return { type: UPDATE_NAME_PLAYLIST, newName }
}