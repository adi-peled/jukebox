
import { userService } from "../../services/userService"
import { authService } from "../../services/authService"


export const loadLoggedUser = () => async dispatch => {

  try{
    const user = await userService.getUser()
    console.log({user});
    dispatch({ type: 'SET_USER', user })
  }catch(err){
      console.log(err);
  }

}

export const signout = () => async dispatch => {
    try{
        await authService.logout()
        const guest = {
            username: 'guest',
            imgString: '',
            favs: [],
            isGuest: true
          }
    dispatch({ type: 'SET_USER', user: guest })
    }catch(err){
        console.log(err);
    }
}

export const signup = (email, password, username, imgString) => async dispatch => {

    try {
        const user = await authService.signup(email, password, username, imgString)
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

export const toggleLike = (user, box, isLiked) => async dispatch => {
    try {
        if (!isLiked) {
            user.favs.push(box)
        } else {
            const idx = user.favs.findIndex(favBox => favBox._id === box._id)
            user.favs.splice(idx, 1)
        }
        await userService.updateUser(user)
        dispatch({ type: 'SET_USER', user })
    }
    catch (err) {
        console.log({ err });
    }
}