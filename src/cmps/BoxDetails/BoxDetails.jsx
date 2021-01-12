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
import AddSong from '../AddSong/AddSong'
//Redux
import { useDispatch, useSelector } from 'react-redux'
import { setCurrSong, removeSong, loadBox, addSong } from '../../store/actions/boxActions'

function BoxDetails(props) {
    const { id } = props.match.params
    const box = useSelector(state => state.boxReducer.currBox)
    // const [videoId, setVideoId] = useState(null)
    const dispatch = useDispatch();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [showAddSong, setShowAddSong] = useState(false)
    useEffect(() => {
        window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
        return () => {
            window.removeEventListener('resize', () => setScreenWidth(window.innerWidth))
        }
    }, [])

    useEffect(() => {
        dispatch(loadBox(id))
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
    async function deleteSong(songId) {
        dispatch(removeSong(id, songId))
    }

    const onAddSong = (song) => {
        dispatch(addSong(song, id))
    }

    return (
        <div className="box-details">
            { box && <div className="flex">
                {screenWidth > 850 && <Chat box={box} />}
                <div className="box-details-section2">
                    <BoxInfo box={box} />
                    <SocialLinks showAddSong={setShowAddSong} />
                    <BoxPlayList playSong={playSong} deleteSong={deleteSong} box={box} />
                    {/* {videoId && <YouTube id="player_id" videoId={videoId} opts={opts} />} */}
                </div>
            </div>
            }
            {showAddSong && <>
                <AddSong onClose={setShowAddSong} onAddSong={onAddSong} />
                <div onClick={() => setShowAddSong(false)} className="screen" />
            </>}
        </div>
    )
}


export default BoxDetails;
