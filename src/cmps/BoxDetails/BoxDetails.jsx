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
import ReactPlayer from 'react-player'

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { setCurrSong, removeSong, loadBox } from '../../store/actions/boxActions'

function BoxDetails(props) {
    const { id } = props.match.params
    const box = useSelector(state => state.boxReducer.currBox) 
    // const [videoId, setVideoId] = useState(null)
    const dispatch = useDispatch();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
        return ()=>{
            window.removeEventListener('resize', () => setScreenWidth(window.innerWidth))
        } 
    }, [])
    const opts = {
        height: '300',
        width: '300',
        playerVars: {
            autoplay: 1,
        }
    }
    function playSong(song) {
        dispatch(setCurrSong(song))
        // setVideoId(song.videoId)
    }
    async function deleteSong(songId){
        dispatch(removeSong(id, songId))
    }
    useEffect(() => {
        dispatch(loadBox(id))
    }, [])
    return (
        <div className="box-details">
            { box && <div className="flex">
                {screenWidth>850 &&<Chat box={box} />}
                <div className="box-details-section2">
                    <BoxInfo box={box} />
                    <SocialLinks />
                    <BoxPlayList  playSong={playSong} deleteSong={deleteSong} box={box}  />
                    {/* {videoId && <YouTube id="player_id" videoId={videoId} opts={opts} />} */}
                </div>
            </div>
            }
        </div>
    )
}


export default BoxDetails;
