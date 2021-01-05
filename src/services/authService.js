import httpService from './httpService'

export const authService = {
    signup,
    login,
    getUser,
    logout
}



function getUser() {
    const user = sessionStorage.getItem('user')
    return user
}

async function logout() {
    // await httpService.post('auth/logout');
    sessionStorage.clear();
}


async function signup(email, password, username) {
    const userCreds = { email, password, username }
    // const user = await httpService.post('auth/signup', userCreds)
    // _handleLogin(user)
    return _handleLogin(userCreds)
}

async function login(email, password) {
    const userCreds = { email, password }
    // const user = await httpService.post('auth/login', userCreds)
    // _handleLogin(user)
}


function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}
