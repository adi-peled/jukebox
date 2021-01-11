import React, { useState, useEffect } from 'react'
//Redux
import { useDispatch, useSelector} from 'react-redux'

//Components 
import ReactPlayer from 'react-player/youtube'

function Player() {
    const { currSong } = useSelector(state => state.boxReducer)
    return (
        <div>
            {currSong && <ReactPlayer
            playing={currSong.isPlaying}
            url={`https://www.youtube.com/watch?v=${currSong?.videoId}`}
            /> }
            sadsad
        </div>
    )
}

export default Player
