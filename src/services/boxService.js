import img from '../assets/adi.jpeg'
import httpService from './httpService'

export const boxService = {
    getBoxes,
    getBoxById,
    updateBox
}

// let playLists = [{name: 'mizrahit', songs: [{}]}]


let boxes = [
    {
        _id: '01',
        name: 'eyal golan',
        genre: 'mizrahit',
        createdBy: 'Maor',
        imgUrl: img,
        chat: [{ _id: 'xxxx', text: 'msg' }],
        playList: [
            {
                name: 'אייל גולן - טעיתי',
                videoId: 'tGubzVL31r4',
                duration: '3:41',
            },
            {
                name: 'אאייל גולן - שרק תחייך',
                videoId: '-K1LR032-CM',
                duration: '3:16',
                // imgUrl: 
            },
            {
                name: '2אייל גולן - טעיתי',
                videoId: 'aJXd_64QHqo',
                duration: '3:56',
                // imgUrl: 
            }
        ]
    },
    {
        _id: '02',
        name: 'eyal golan',
        genre: 'mizrahit',
        imgUrl: img,
        chat: [{ _id: 'xxxx', text: 'msg' }],
        playList: [
            {
                name: 'אייל גולן - טעיתי',
                videoId: 'tGubzVL31r4',
                duration: '3:41',
                // imgUrl: 
            },
            {
                name: 'אאייל גולן - שרק תחייך',
                videoId: '-K1LR032-CM',
                duration: '3:16',
                // imgUrl: 
            },
            {
                name: '2אייל גולן - טעיתי',
                videoId: 'aJXd_64QHqo',
                duration: '3:56',
                // imgUrl: 
            }
        ]
    },
    {
        _id: '03',
        name: 'eyal golan',
        genre: 'mizrahit',
        imgUrl: img,
        chat: [{ _id: 'xxxx', text: 'msg' }],
        playList: [
            {
                name: 'אייל גולן - טעיתי',
                videoId: 'tGubzVL31r4',
                duration: '3:41',
                // imgUrl: 
            },
            {
                name: 'אאייל גולן - שרק תחייך',
                videoId: '-K1LR032-CM',
                duration: '3:16',
                // imgUrl: 
            },
            {
                name: '2אייל גולן - טעיתי',
                videoId: 'aJXd_64QHqo',
                duration: '3:56',
                // imgUrl: 
            }
        ]
    },
    {
        _id: '04',
        name: 'eyal golan',
        genre: 'mizrahit',
        imgUrl: img,
        chat: [{ _id: 'xxxx', text: 'msg' }],
        playList: [
            {
                name: 'אייל גולן - טעיתי',
                videoId: 'tGubzVL31r4',
                duration: '3:41',
                // imgUrl: 
            },
            {
                name: 'אאייל גולן - שרק תחייך',
                videoId: '-K1LR032-CM',
                duration: '3:16',
                // imgUrl: 
            },
            {
                name: '2אייל גולן - טעיתי',
                videoId: 'aJXd_64QHqo',
                duration: '3:56',
                // imgUrl: 
            }
        ]
    },
    {
        _id: '05',
        name: 'eyal golan',
        genre: 'mizrahit',
        imgUrl: img,
        chat: [{ _id: 'xxxx', text: 'msg' }],
        playList: [
            {
                name: 'אייל גולן - טעיתי',
                videoId: 'tGubzVL31r4',
                duration: '3:41',
                // imgUrl: 
            },
            {
                name: 'אאייל גולן - שרק תחייך',
                videoId: '-K1LR032-CM',
                duration: '3:16',
                // imgUrl: 
            },
            {
                name: '2אייל גולן - טעיתי',
                videoId: 'aJXd_64QHqo',
                duration: '3:56',
                // imgUrl: 
            }
        ]
    },
    {
        _id: '06',
        name: 'eyal golan',
        genre: 'mizrahit',
        imgUrl: img,
        chat: [{ _id: 'xxxx', text: 'msg' }],
        playList: [
            {
                name: 'אייל גולן - טעיתי',
                videoId: 'tGubzVL31r4',
                duration: '3:41',
                // imgUrl: 
            },
            {
                name: 'אאייל גולן - שרק תחייך',
                videoId: '-K1LR032-CM',
                duration: '3:16',
                // imgUrl: 
            },
            {
                name: '2אייל גולן - טעיתי',
                videoId: 'aJXd_64QHqo',
                duration: '3:56',
                // imgUrl: 
            }
        ]
    },
    {
        _id: '07',
        name: 'eyal golan',
        genre: 'mizrahit',
        imgUrl: img,
        chat: [{ _id: 'xxxx', text: 'msg' }],
        playList: [
            {
                name: 'אייל גולן - טעיתי',
                videoId: 'tGubzVL31r4',
                duration: '3:41',
                // imgUrl: 
            },
            {
                name: 'אאייל גולן - שרק תחייך',
                videoId: '-K1LR032-CM',
                duration: '3:16',
                // imgUrl: 
            },
            {
                name: '2אייל גולן - טעיתי',
                videoId: 'aJXd_64QHqo',
                duration: '3:56',
                // imgUrl: 
            }
        ]
    },
    {
        _id: '08',
        name: 'eyal golan',
        genre: 'mizrahit',
        imgUrl: img,
        chat: [{ _id: 'xxxx', text: 'msg' }],
        playList: [
            {
                name: 'אייל גולן - טעיתי',
                videoId: 'tGubzVL31r4',
                duration: '3:41',
                // imgUrl: 
            },
            {
                name: 'אאייל גולן - שרק תחייך',
                videoId: '-K1LR032-CM',
                duration: '3:16',
                // imgUrl: 
            },
            {
                name: '2אייל גולן - טעיתי',
                videoId: 'aJXd_64QHqo',
                duration: '3:56',
                // imgUrl: 
            }
        ]
    },
    {
        _id: '09',
        name: 'eyal golan',
        genre: 'mizrahit',
        imgUrl: img,
        chat: [{ _id: 'xxxx', text: 'msg' }],
        playList: [
            {
                name: 'אייל גולן - טעיתי',
                videoId: 'tGubzVL31r4',
                duration: '3:41',
                // imgUrl: 
            },
            {
                name: 'אאייל גולן - שרק תחייך',
                videoId: '-K1LR032-CM',
                duration: '3:16',
                // imgUrl: 
            },
            {
                name: '2אייל גולן - טעיתי',
                videoId: 'aJXd_64QHqo',
                duration: '3:56',
                // imgUrl: 
            }
        ]
    },
    {
        _id: '10',
        name: 'eyal golan',
        genre: 'mizrahit',
        imgUrl: img,
        chat: [{ _id: 'xxxx', text: 'msg' }],
        playList: [
            {
                name: 'אייל גולן - טעיתי',
                videoId: 'tGubzVL31r4',
                duration: '3:41',
                // imgUrl: 
            },
            {
                name: 'אאייל גולן - שרק תחייך',
                videoId: '-K1LR032-CM',
                duration: '3:16',
                // imgUrl: 
            },
            {
                name: '2אייל גולן - טעיתי',
                videoId: 'aJXd_64QHqo',
                duration: '3:56',
                // imgUrl: 
            }
        ]
    }
]



async function getBoxes() {
    return await httpService.get('box')
}

async function getBoxById(id) {
    return await httpService.get(`box/${id}`)
}
async function updateBox(box) {
    const id = box._id
    return await httpService.put(`box/${id}`, box)
}