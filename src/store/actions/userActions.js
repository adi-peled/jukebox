
import { userService } from "../../services/userService"
import { authService } from "../../services/authService"


export const loadLoggedUser = () => async dispatch => {
    const user = await authService.getUser()
    dispatch({ type: 'SET_USER', user })
}

export const signout = () => async dispatch => {
    await authService.logout()
    dispatch({ type: 'SET_USER', user: null })
}

export const signup = (email, password, username) => async dispatch => {
    const user = await authService.signup(email, password, username)
    if (user) {
        return dispatch({ type: 'SET_USER', user })
    }
}

export const login = (email, password) => async dispatch => {
    const user = await authService.login(email, password)
    if (user) {
        return dispatch({ type: 'SET_USER', user })
    }
}
