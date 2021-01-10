const INITIAL_STATE = {
    currSong: null
}

export function songReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'PLAY_SONG':
            return {
                ...state,
                currSong: action.song
            }
        default:
            return state
    }
}