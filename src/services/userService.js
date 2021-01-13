import httpService from './httpService'


export const userService = {
    getUser,
    updateUser
}

async function getUser() {
    return await httpService.get('user')

}

async function updateUser(user) {
    const id = user._id
    return await httpService.put(`user/${id}`, user)
}
