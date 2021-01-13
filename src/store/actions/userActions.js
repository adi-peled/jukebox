
import { userService } from "../../services/userService"
import { authService } from "../../services/authService"


export const loadLoggedUser = () => async dispatch => {
    const user = await userService.getUser()
    console.log(user);
    dispatch({ type: 'SET_USER', user })
}

export const signout = () => async dispatch => {
    await authService.logout()
    dispatch({ type: 'SET_USER', user: null })
}

export const signup = (email, password, username,imgString) => async dispatch => {

    try {
        const user = await authService.signup(email, password, username,imgString)
        if (user) {
            dispatch({ type: 'SET_USER', user })
            return true
        } else {
            return 'something went wrong'
        }
    } catch (err) {
        console.log({ err });
    }
}

export const login = (email, password) => async dispatch => {
    try {
        const user = await authService.login(email, password)
        if (user) {
            dispatch({ type: 'SET_USER', user })
            return true
        } else {
            return 'Invalid password or email'
        }
    } catch (err) {
        console.log({ err });
    }
}

export const likeBox = (user, box) => async dispatch => {
    try {
        console.log(box);   
        user.favs.push(box)
        await userService.updateUser(user)
        dispatch({ type: 'SET_USER', user })
    }
    catch (err) {
        console.log({ err });
        }
}