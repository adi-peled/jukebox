import React, { useState, useEffect } from 'react'
//Redux
import { useDispatch, useSelector} from 'react-redux'
import { setCurrSong, removeSong, loadBox } from '../../store/actions/boxActions'
//Scss
import './Player.scss'
//Components 
import ReactPlayer from 'react-player/youtube'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SongPreview from '../SongPreview/SongPreview'

function Player() {
    const dispatch = useDispatch()
    const { currSong } = useSelector(state => state.boxReducer)
    const [volume, setVolume] = useState(75)
    const [secPlayed, setSecPlayed] = useState(0)
    const [duration, setDuration] = useState(0)

    function handleVolumeChange({ target }){
        setVolume(parseFloat(target.value))
    }
    function handleProgress(e){
        setSecPlayed(e.playedSeconds)
    }
    function handleDuration(e){
        setDuration(e)
    }
    function handleDurationChange(e){
    }
    function showTime(seconds) {
        var mins;
        var secs;
        if (seconds >= 60) {
            mins = (parseInt(seconds / 60)).toString();
            secs = (parseInt(seconds - mins * 60)).toString().padStart(2, '0');
        } else {
            mins = '0';
            secs = (parseInt(seconds)).toString().padStart(2, '0');
        }
        return `${mins}:${secs}`
    }
    return (
        <div>
            {currSong && <ReactPlayer
            className="hidden"
            playing={currSong.isPlaying}
            url={`https://www.youtube.com/watch?v=${currSong?.videoId}`}
            volume={volume}
            onProgress={(e)=>handleProgress(e)}
            onDuration={(e)=>handleDuration(e)}
            /> }
            {currSong && <div className="player flex space-between">
                <button onClick={()=>dispatch(setCurrSong(currSong))}>{currSong.isPlaying ? <PauseCircleOutlineIcon/> 
                : <PlayCircleOutlineIcon />}
                </button>
                {showTime(secPlayed)}
                <input className="duration-slider"
                name="played"
                value={secPlayed}
                type="range"
                min={0}
                max={duration}
                onChange={(e)=>handleDurationChange(e)}
                />
                {showTime(duration)}

                <input className="volume-slider" 
                value= { volume } 
                type="range"
                min={0}
                step={0.05}
                max={1}
                onChange={(e)=>handleVolumeChange(e)}
                />
            </div>}
        </div>
    )
}

export default Player
