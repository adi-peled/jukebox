import httpService from './httpService'

export const authService = {
    signup,
    login,
    logout
}





async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();
}


async function signup(email, password, username,imgString) {
    const userCreds = { email, password, username,imgString }
    try {
        const user = await httpService.post('auth/signup', userCreds)
        if(user){
            return _handleLogin(user)
        }
    } catch (err) {
        throw err
    }

}

async function login(email, password) {
    const userCreds = { email, password }
    try {
        const user = await httpService.post('auth/login', userCreds)
       
        if(user){
            return _handleLogin(user)
        }
    } catch (err) {
        console.log({err});
        throw err
    }

}


function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}
