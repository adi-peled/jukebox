const INITIAL_STATE = {
    user: null,
    guest: null
}

export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_GUEST':
            return {
                ...state,
                guest: action.guest
            }
        default:
            return state
    }
}