const INITIAL_STATE = {
    currSong: null,
    boxes: null
}

export function boxReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'PLAY_SONG':
            return {
                ...state,
                currSong: action.song
            }
        case 'LOAD_BOXES':
            return {
                ...state,
                boxes: action.boxes
            }
        default:
            return state
    }
}