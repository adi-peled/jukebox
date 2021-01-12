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
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
function Player() {
    const dispatch = useDispatch()
    const { currSong } = useSelector(state => state.boxReducer)
    const { currBox } = useSelector(state => state.boxReducer)
    const [volume, setVolume] = useState(0.75)
    const [secPlayed, setSecPlayed] = useState(0)
    const [duration, setDuration] = useState(0)
    const [mute, setMute] = useState(false)

    function skipSong(diff){
        var index = currBox.playList.findIndex(song=>song._id===currSong._id)
        if(index + diff >= currBox.playList.length){
            dispatch(setCurrSong(currBox.playList[0]))
        }else if(index + diff < 0){
            dispatch(setCurrSong(currBox.playList[currBox.playList.length-1]))
        }else{
            dispatch(setCurrSong(currBox.playList[index+diff]))
        }
    }
    
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
    function handleMute(){
        setMute(!mute)
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
            muted={mute}
            onProgress={(e)=>handleProgress(e)}
            onDuration={(e)=>handleDuration(e)}
            onEnded={()=>skipSong(1)}
            /> }
            {currSong && <div className={currSong.isPlaying ? "player bgc-animation" : "player" }>
                <div>
                    <img className="player-img" src={currSong.imgUrl} alt=""/>
                    <p>{currSong.name}</p>
                </div>
                <div>
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
                </div>    
                    
                <div className="player-buttons">
                    <button onClick={()=>skipSong(-1)}>
                        <SkipPreviousIcon/>
                    </button>
                    <button onClick={()=>dispatch(setCurrSong(currSong))}>{currSong.isPlaying ? <PauseCircleOutlineIcon/> 
                    : <PlayCircleOutlineIcon />}
                    </button>
                    <button onClick={()=>skipSong(1)}>
                        <SkipNextIcon/>
                    </button>
                    <button onClick={handleMute}>
                        { volume==0 && <VolumeOffIcon/>}
                        { mute==true && <VolumeOffIcon/>}
                        {volume >0 && volume <0.75 && <VolumeDownIcon/>}
                        {mute===false && volume >=0.75 && volume <=1 && <VolumeUpIcon/>}
                    </button>

                    <input className="volume-slider" 
                    value= { volume } 
                    type="range"
                    min={0}
                    step={0.05}
                    max={1}
                    onChange={(e)=>handleVolumeChange(e)}
                    />
                </div>
            </div>}
        </div>
    )
}

export default Player
