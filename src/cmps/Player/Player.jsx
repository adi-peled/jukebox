import React, { useState, useEffect } from 'react'
//Redux
import { useDispatch, useSelector } from 'react-redux'
import { setCurrSong } from '../../store/actions/boxActions'
//Scss
import './Player.scss'
//Components 
import Slider from '@material-ui/core/Slider';
import ReactPlayer from 'react-player/youtube'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
//services
import { socketService } from '../../services/socketService'

function Player() {
    const dispatch = useDispatch()
    const { currSong } = useSelector(state => state.boxReducer)
    const { currBox } = useSelector(state => state.boxReducer)
    const [volume, setVolume] = useState(0.75)
    const [secPlayed, setSecPlayed] = useState(0)
    const [duration, setDuration] = useState(0)
    const [mute, setMute] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    function skipSong(diff) {
        currBox.playList.forEach((song, index) => {
            if (song.id === currSong.id) {
                if (index + diff >= currBox.playList.length) {
                    dispatch(setCurrSong(currBox.playList[0]))
                    socketService.emit('update song', currBox.playList[0])
                } else if (index + diff < 0) {
                    dispatch(setCurrSong(currBox.playList[currBox.playList.length - 1]))
                    socketService.emit('update song', currBox.playList[currBox.playList.length - 1])
                } else {
                    dispatch(setCurrSong(currBox.playList[index + diff]))
                    socketService.emit('update song', currBox.playList[index + diff])
                }
            }
        })
    }

    useEffect(() => {
        window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
        if (screenWidth < 850) {
            setVolume(1)
        }
        return () => {
            window.removeEventListener('resize', () => setScreenWidth(window.innerWidth))
        }
    }, [])


    function handleVolumeChange({ target },newVal) {
        setVolume(parseFloat(newVal))
    }
    function handleProgress(e) {
        setSecPlayed(e.playedSeconds)
    }

    function handleDuration(e) {
        setDuration(e)
    }

    function handleDurationChange() {

    }

    function pauseSong() {
        dispatch(setCurrSong(currSong))
        socketService.emit('update song', { ...currSong, isPlaying: currSong.isPlaying })
    }

    function handleMute() {
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
                onProgress={(e) => handleProgress(e)}
                onDuration={(e) => handleDuration(e)}
                onEnded={() => skipSong(1)}
            />}
            {currSong && <div className={currSong.isPlaying ? "player bgc-animation" : "player "}>
                <div>
                    <img className="player-img" src={currSong.imgUrl} alt="" />
                    {screenWidth > 850 && <p>{currSong.name}</p>}
                </div>
                {screenWidth > 850 && <div>
                    {showTime(secPlayed)}
                    <Slider className="duration-slider"
                        name="played"
                        value={secPlayed}  
                        min={0}
                        max={duration}
                        onChange={(e) => handleDurationChange(e)}
                    />
                    {showTime(duration)}
                </div>}
                {screenWidth < 850 && <div>{showTime(secPlayed)}</div>}

                <div className="player-buttons">
                    <button onClick={() => skipSong(-1)}>
                        <SkipPreviousIcon />
                    </button>
                    <button onClick={() => pauseSong()}>{currSong?.isPlaying ? <PauseCircleOutlineIcon />
                        : <PlayCircleOutlineIcon />}
                    </button>
                    <button onClick={() => skipSong(1)}>
                        <SkipNextIcon />
                    </button>
                    <button onClick={handleMute}>
                        {mute == true && <VolumeOffIcon />}
                        {mute === false && volume == 0 && <VolumeOffIcon />}
                        {mute === false && volume > 0 && volume < 0.75 && <VolumeDownIcon />}
                        {mute === false && volume >= 0.75 && volume <= 1 && <VolumeUpIcon />}
                    </button>

                    {screenWidth > 850 && <Slider className="volume-slider"
                        aria-labelledby="continuous-slider"
                        defaultValue ={volume}
                        orientation="vertical"
                        min={0}
                        step={0.05}
                        max={1}
                        onChange={handleVolumeChange}
                    />}
                </div>
            </div>}
        </div>
    )
}

export default Player
