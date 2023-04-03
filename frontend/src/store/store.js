import { legacy_createStore as createStore, combineReducers } from 'redux'

import { playlistReducer } from './playlist.reducer'
import { playerReducer } from './player.reducer'


const rootReducer = combineReducers({
    playlistModule: playlistReducer,
    playerModule: playerReducer,
    systemModule: playerReducer,
})

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

store.subscribe(() => {
    console.log('storeState:\n', store.getState())
})



