import { store } from './store'
import { SET_PLAYLIST, ADD_SONG_TO_PLAYLIST, REMOVE_SONG_FROM_PLAYLIST, ADD_PLAYLIST, REMOVE_PLAYLIST, SET_PLAYLISTS, UPDATE_PLAYLIST, SET_SONGS_LIST } from './playlist.reducer'

import { userService } from '../services/user.service'
import { playlistService } from '../services/playlist.service'


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

export async function loadPlaylists() {
    try {
        const playlists = await playlistService.query()
        store.dispatch({ type: SET_PLAYLISTS, playlists })
    } catch (err) {
        console.log('Cannot load playlists', err)
        throw err
    }
}
export async function loadPlaylistsByUser() {
    try {
        let playlists = await playlistService.query()
        playlists = await playlists.filter(playlist => playlist.createdBy._id === userService.getLoggedinUser()._id)
        console.log(playlists)
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

export async function addSonfToPlaylist(playlistId, newSong) {
    try {
        let newPlaylist = await playlistService.getById(playlistId)
        newPlaylist = { ...newPlaylist, songs: [...newPlaylist.songs, newSong] }
        const savedPlaylist = await playlistService.save(newPlaylist)
        console.log('Added Playlist', savedPlaylist)
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
    } catch (err) {
        console.log('Cannot remove playlist', err)
        throw err
    }
}

export async function savePlaylist(playlist) {
    const type = (playlist._id) ? UPDATE_PLAYLIST : ADD_PLAYLIST
    try {
        const savedPlaylist = await playlistService.save(playlist)
        store.dispatch({ type, playlist: savedPlaylist })
        return savedPlaylist
    }
    catch (err) {
        console.error('Cannot save playlist:', err)
        throw err
    }
}