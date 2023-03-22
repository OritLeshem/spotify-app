import { playlistService } from "../services/playlist.service.local"

export const SET_PLAYLISTS = 'SET_PLAYLISTS'
export const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST'
export const ADD_PLAYLIST = 'ADD_PLAYLIST'
export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST'
export const UNDO_REMOVE_PLAYLIST = 'UNDO_REMOVE_PLAYLIST'
export const SET_FILTER = 'SET_FILTER'
//song
export const REMOVE_SONG_FROM_PLAYLIST = 'REMOVE_SONG_FROM_PLAYLIST'
export const SET_PLAYLIST = 'SET_PLAYLIST'
export const ADD_SONG_TO_PLAYLIST = 'ADD_SONG_TO_PLAYLIST'

const initialState = {
    playlists: [],
    playlist: null,
    filterBy: playlistService.getDefaultFilter(),
    lastRemovedPlaylist: null
}

export function playlistReducer(state = initialState, action) {
    var newState = state
    var playlists
    switch (action.type) {
        case SET_PLAYLISTS:
            newState = { ...state, playlists: action.playlists }
            break
        case REMOVE_PLAYLIST:
            const lastRemovedPlaylist = state.playlists.find(playlist => playlist._id === action.playlistId)
            playlists = state.playlists.filter(playlist => playlist._id !== action.playlistId)
            newState = { ...state, playlists, lastRemovedPlaylist }
            break

        case ADD_PLAYLIST:
            newState = { ...state, playlists: [...state.playlists, action.playlist] }
            break
        case UPDATE_PLAYLIST:
            playlists = state.playlists.map(playlist => (playlist._id === action.playlist._id) ? action.playlist : playlist)
            newState = { ...state, playlists }
            break
        case UNDO_REMOVE_PLAYLIST:
            if (state.lastRemovedPlaylist) {
                newState = { ...state, playlists: [...state.playlists, state.lastRemovedPlaylist], lastRemovedPlaylist: null }
            }
            break
        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }
        //song in playlist
        case SET_PLAYLIST:
            newState = { ...state, playlist: action.playlist }
            break
        case REMOVE_SONG_FROM_PLAYLIST:
            newState = { ...state, playlist: action.playlist }
            break
        case ADD_SONG_TO_PLAYLIST:
            newState = { ...state, playlist: action.playlist }
            break
        default:
    }
    return newState
}