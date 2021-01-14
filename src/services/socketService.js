
const BASE_URL = process.env.NODE_ENV === 'production' ?
    '/' :
    'localhost:5000/'


function getUrl(){
    return BASE_URL
}

export const socketService = {
    getUrl
}