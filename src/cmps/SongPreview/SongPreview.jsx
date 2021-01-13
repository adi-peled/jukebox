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

function SongPreview({ song, playSong, deleteSong }) {
    const [isRemoving, setIsRemoving] = useState(false)
    const { currSong } = useSelector(state => state.boxReducer)
    const isSongPlaying = (song.id === currSong?.id) && currSong?.isPlaying;
    const isCurrSong = currSong?.id===song.id? true:false;
    

    function changeIsRemoving() {
        setIsRemoving(!isRemoving)
        setTimeout(() => {
            setIsRemoving(false)
        }, 3000)
    }

    return (
        <div className={isCurrSong? "flex space-between song-preview active": "flex space-between song-preview"} onDoubleClick={() => playSong(song)}>
            <div className="song-preview-left flex">
                {isSongPlaying ? <PauseCircleOutlineIcon className="song-preview-svg" onClick={() => playSong(currSong)} /> :
                    <PlayCircleOutlineIcon className="song-preview-svg" onClick={() => playSong(song)} />}
                <img className="song-preview-img" src={song.imgUrl} />
                <div>{song.name}</div>
            </div>
            <div className="song-preview-right flex">
                <div className="song-preview-duration">{song.duration}</div>
                {isSongPlaying ? <img className="equalizer-gif" src={equalizer} /> : <div className="equalizer-gif"></div>}
                {isRemoving ? <DeleteOutlineOutlinedIcon className="deleting" onClick={() => deleteSong(song.id)} className="song-preview-svg" /> : <MoreVertIcon onClick={changeIsRemoving} className="song-preview-svg" />}
            </div>
        </div>
    )
}

export default SongPreview
