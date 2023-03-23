import { store } from './store'
import { SET_PLAYLIST, ADD_SONG_TO_PLAYLIST, REMOVE_SONG_FROM_PLAYLIST, ADD_PLAYLIST, REMOVE_PLAYLIST, SET_PLAYLISTS, UNDO_REMOVE_PLAYLIST, UPDATE_PLAYLIST } from './playlist.reducer'

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

