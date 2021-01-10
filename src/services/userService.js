import httpService from './httpService'


export const userService = {
    getUser
}

async function getUser() {
    return await httpService.get('user')

}


