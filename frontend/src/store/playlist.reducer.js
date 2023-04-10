import { playlistService } from "../services/playlist.service"

export const SET_PLAYLISTS = 'SET_PLAYLISTS'
export const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST'
export const ADD_PLAYLIST = 'ADD_PLAYLIST'
export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST'
export const UNDO_REMOVE_PLAYLIST = 'UNDO_REMOVE_PLAYLIST'
export const UPDATE_NAME_PLAYLIST = 'UPDATE_NAME_PLAYLIST'
//song
export const REMOVE_SONG_FROM_PLAYLIST = 'REMOVE_SONG_FROM_PLAYLIST'
export const SET_PLAYLIST = 'SET_PLAYLIST'
export const ADD_SONG_TO_PLAYLIST = 'ADD_SONG_TO_PLAYLIST'
export const SET_SONGS_LIST = 'SET_SONGS_LIST'

const initialState = {
    playlists: [],
    playlist: null,
    lastRemovedPlaylist: null,
    playSongs: [{
        "_id": "4m1EFMoRFvY",
        "title": "Beyoncé - Single Ladies",
        "description": "Beyoncé's official 'Single Ladies",
        "tags": [
            "Pop",
            "Happy"
        ],
        "imgUrl": "https://i.ytimg.com/vi/4m1EFMoRFvY/hqdefault.jpg",
        currentTime: 0
    }],
    currentSong: {
        "_id": "4m1EFMoRFvY",
        "title": "Beyoncé - Single Ladies",
        "description": "Beyoncé's official 'Single Ladies",
        "tags": [
            "Pop",
            "Happy"
        ],
        "imgUrl": "https://i.ytimg.com/vi/4m1EFMoRFvY/hqdefault.jpg",
        currentTime: 0
    }
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
            console.log('PLAYLISTS', playlists)
            break
        //song in playlist
        case SET_PLAYLIST:
            newState = { ...state, playlist: action.playlist }
            break
        //song in playlist-search

        case SET_SONGS_LIST:
            newState = { ...state, playSongs: action.playSongs }
            break
        case REMOVE_SONG_FROM_PLAYLIST:
            newState = { ...state, playlist: action.playlist }
            break
        case ADD_SONG_TO_PLAYLIST:
            newState = { ...state, playlist: action.playlist }
            break
        case UPDATE_NAME_PLAYLIST:
            newState = { ...state, playlist: { ...state.playlist, name: action.newName } }
            break
        default:
    }
    return newState
}
