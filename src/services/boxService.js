import img from '../assets/adi.jpeg'
import httpService from './httpService'

export const boxService = {
    query,
    getById,
    save
}

async function query({ genre = '', name = '' }) {
    return await httpService.get('box' + `?genre=${genre}&name=${name}`)
}

async function getById(id) {
    return await httpService.get(`box/${id}`)
}
async function _update(box) {
    const id = box._id
    return await httpService.put(`box/${id}`, box)
}

function save(box) {
    return box._id ? _update(box) : _create(box)
}

async function _create(box) {
    return await httpService.post(`box`, box)
}