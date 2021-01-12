import React, { useState, useEffect, } from 'react'
//Css
import './SongPreview.scss'
//Components
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import equalizer from '../../assets/img/equalizer.gif'
//redux
import { useSelector } from 'react-redux'
//img
import imgjustfornow from '../../assets/img/hero1.jpg'

function SongPreview({ song, playSong, deleteSong }) {
    const [isRemoving, setIsRemoving] = useState(false)
    const { currSong } = useSelector(state => state.boxReducer)
    const isSongPlaying = (song._id === currSong?._id) && currSong?.isPlaying;

    

    function changeIsRemoving() {
        setIsRemoving(!isRemoving)
        setTimeout(() => {
            setIsRemoving(false)
        }, 3000)
    }

    return (
        <div className="flex space-between song-preview" onDoubleClick={() => playSong(song)}>
            <div className="song-preview-left flex">
                {isSongPlaying ? <PauseCircleOutlineIcon className="song-preview-svg" onClick={() => playSong(currSong)} /> :
                    <PlayCircleOutlineIcon className="song-preview-svg" onClick={() => playSong(song)} />}
                <img className="song-preview-img" src={imgjustfornow} />
                <div>{song.name}</div>
            </div>
            <div className="song-preview-right flex">
                {isSongPlaying ? <img className="equalizer-gif" src={equalizer} /> : <div className="equalizer-gif"></div>}
                <div>{song.duration}</div>
                {isRemoving ? <DeleteOutlineOutlinedIcon onClick={() => deleteSong(song._id)} className="song-preview-svg" /> : <MoreVertIcon onClick={changeIsRemoving} className="song-preview-svg" />}
            </div>
        </div>
    )
}

export default SongPreview
