import httpService from './httpService'

export const authService = {
    signup,
    login
}

let loggedinUser = null

async function signup(email, password, username) {
    const userCreds = { email, password, username }
    const user = await httpService.post('auth/signup', userCreds)
    _handleLogin(user)
}

async function login(email, password) {
    const userCreds = { email, password }
    const user = await httpService.post('auth/login', userCreds)
    _handleLogin(user)
}


function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    loggedinUser = user
    return user;
}
