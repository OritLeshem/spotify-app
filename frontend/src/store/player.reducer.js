export const INCREMENT = 'INCREMENT'
export const SET_CURRENT_SONG = 'SET_CURRENT_SONG'
export const ISPLAYING = 'ISPLAYING'
export const SET_PLAYER = 'SET_PLAYER'
export const SET_VOLUME = 'SET_VOLUME';

const initialState = {
    player: null,
    volume: 0.5,
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
    },
    count: 1,
    isPlaying: false
}

export function playerReducer(state = initialState, action) {

    switch (action.type) {
        case INCREMENT:
            return { ...state, count: state.count + 1 }
        case SET_PLAYER:
            return { ...state, player: action.player }
        case SET_CURRENT_SONG:
            console.log('action', action)
            return { ...state, currentSong: action.song }
        case ISPLAYING:
            return { ...state, isPlaying: !state.isPlaying }
        case SET_VOLUME:
            return { ...state, volume: action.volume };
        default:
            return { ...state }
    }

}
