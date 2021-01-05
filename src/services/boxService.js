export const boxService = {
    getBoxs,
    getBoxById
}

// let playLists = [{name: 'mizrahit', songs: [{}]}]

let boxs=[ {
            _id: 'XXX',
            name: 'eyal golan',
            genre: 'mizrahit',
            chat: [{_id:'xxxx',text:'msg'}],
            playList:[
                {
                name: 'אייל גולן - טעיתי',
                vid: 'tGubzVL31r4',
                duration: '3:41',
                // imgUrl: 
            },
               {
                name: 'אאייל גולן - שרק תחייך',
                vid: '-K1LR032-CM',
                duration: '3:16',
                // imgUrl: 
            },
               {
                name: '2אייל גולן - טעיתי',
                vid: 'aJXd_64QHqo',
                duration: '3:56',
                // imgUrl: 
            }
        ]
    },
]



function getBoxs(){
    return boxs
}

function getBoxById(id){
    return boxs.filter(box=>box._id===id)
}