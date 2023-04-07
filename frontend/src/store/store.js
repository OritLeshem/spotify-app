import { legacy_createStore as createStore, combineReducers } from 'redux'

import { playlistReducer } from './playlist.reducer'
import { playerReducer } from './player.reducer'
import { userReducer } from './user.reducer'
// import { systemReducer } from './system.reducer'

const rootReducer = combineReducers({
    userModule: userReducer,
    playlistModule: playlistReducer,
    playerModule: playerReducer,
    // systemModule: systemReducer,
})

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

store.subscribe(() => {
    // console.log('storeState:\n', store.getState())
})



