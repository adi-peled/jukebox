import httpService from './httpService'


export const userService = {
    get,
    update
}

async function get() {
    return await httpService.get('user')
}

async function update(user) {
    const id = user._id
    return await httpService.put(`user/${id}`, user)
}
