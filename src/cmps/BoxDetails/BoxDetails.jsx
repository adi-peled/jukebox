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
import YouTube from 'react-youtube'
//Redux
import { useDispatch, useSelector } from 'react-redux'
import { setCurrSong } from '../../store/actions/songAction.js'

function BoxDetails(props, state) {
    const { id } = props.match.params
    const [box, setBox] = useState(null)
    const [videoId, setVideoId] = useState(null)
    const dispatch = useDispatch();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
        return ()=>{
            window.removeEventListener('resize', () => setScreenWidth(window.innerWidth))
        } 
    }, [])
    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            autoplay: 1,
        }
    }
    function playSong(song) {
        dispatch(setCurrSong(song))
        setVideoId(song.videoId)
    }
    function getBox() {
        const box = boxService.getBoxById(id)
        setBox(...box)
    }

    useEffect(() => {
        getBox(id)
    }, [])
    return (
        <div className="box-details">
            { box && <div className="flex">
                {screenWidth>850 &&<Chat box={box} />}
                <div className="box-details-section2">
                    <BoxInfo box={box} />
                    <SocialLinks />
                    <BoxPlayList playSong={playSong} box={box} />
                    {videoId && <YouTube videoId={videoId} opts={opts} />}
                </div>
            </div>
            }
        </div>
    )
}


export default BoxDetails;
