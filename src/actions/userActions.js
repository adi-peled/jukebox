
import { userService } from "../../services/userService"





export function setUser() {
    return async dispatch => {
        const user = await userService.getUser()
        dispatch({ type: 'SET_USER', user })
    }
}
