import img from '../assets/adi.jpeg'
import httpService from './httpService'

export const boxService = {
    getBoxes,
    getBoxById,
    updateBox,
    createBox
}

async function getBoxes(filterBy) {
    if (!filterBy) {
        return await httpService.get('box')
    } else {
        let { genre } = filterBy
        if (genre === 'All') genre = ''
        return await httpService.get('box' + `?genre=${genre}`)
    }
}

async function getBoxById(id) {
    return await httpService.get(`box/${id}`)
}
async function updateBox(box) {
    const id = box._id
    return await httpService.put(`box/${id}`, box)
}

async function createBox(box) {
    return await httpService.post(`box`, box)
}