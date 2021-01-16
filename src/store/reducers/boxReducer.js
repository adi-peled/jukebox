const INITIAL_STATE = {
    currSong: null,
    boxes: null,
    currBox: null,
    filterBy: {
        name: '',
        genre: ''
    },
    chat:null
}

export function boxReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_CURR_SONG':
            return {
                ...state,
                currSong: action.song
            }
        case 'LOAD_BOXES':
            return {
                ...state,
                boxes: action.boxes
            }
        case 'LOAD_BOX_CHAT':
            return {
                ...state,
                chat: action.chat
            }
        case 'LOAD_BOX':
            return {
                ...state,
                currBox: action.box
            }
        case 'ADD_BOX':
            return {
                ...state,
                boxes: [...state.boxes, action.box]
            }
        case 'SET_FILTER':
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }
        default:
            return state
    }
}