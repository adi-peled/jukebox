const INITIAL_STATE = {
    user: null
}

export function songReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'PLAY_SONG':
            return {
                ...state,
                song: action.song
            }
        default:
            return state
    }
}