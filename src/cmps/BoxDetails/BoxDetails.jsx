import React, { useEffect, useState } from 'react'

import './BoxDetails.scss'

import { boxService } from '../../services/boxService'
import BoxPlayList from '../BoxPlayList/BoxPlayList'
import Chat from '../Chat/Chat'
import BoxInfo from '../BoxInfo/BoxInfo'
function BoxDetails(props) {
    const { id } = props.match.params
    const [box,setBox] = useState(null)

    function getBox(){
        const box = boxService.getBoxById(id)
        setBox(...box)
    }
    useEffect(() => {
        getBox(id)
        console.log(box);
    }, [])
    return (
        <div className="box-details">
            { box &&<div className="flex"> 
                <Chat box={box}/>
            <div>
                <BoxInfo box={box}/>
                <BoxPlayList box={box}/>
            </div>
                </div>
            }
        </div>
    )
}

export default BoxDetails
