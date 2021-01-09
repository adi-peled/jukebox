import React, { useEffect, useState } from 'react'
//Scss
import './BoxDetails.scss'
//Services
import { boxService } from '../../services/boxService'
import { youtubeService } from '../../services/youtubeService'
//Components
import BoxPlayList from '../BoxPlayList/BoxPlayList'
import Chat from '../Chat/Chat'
import BoxInfo from '../BoxInfo/BoxInfo'
import SocialLinks from '../SocialLinks/SocialLinks'
//Redux
import { useDispatch } from 'react-redux'
import { setCurrSong } from '../../store/actions/songAction.js'

function BoxDetails(props) {
    const { id } = props.match.params
    const [box,setBox] = useState(null)
    const dispatch = useDispatch();

    function playSong(song){
        dispatch(setCurrSong(song))
    }
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
                <SocialLinks/>
                <BoxPlayList playSong={playSong} box={box}/>
            </div>
                </div>
            }
        </div>
    )
}

export default BoxDetails
