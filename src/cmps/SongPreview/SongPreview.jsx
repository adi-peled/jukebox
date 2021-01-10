import React, { useState, useEffect } from 'react'
import './SongPreview.scss'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import equalizer from '../../assets/equalizer.gif'
function SongPreview({song, playSong, currSong}) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
//todo: currSong from state
// changre is edit  to remove
    useEffect(() => {
        if(currSong){
            if(song.vid===currSong.vid){
                setIsPlaying(true)
            }else{
                setIsPlaying(false)
            }
        }
    }, [currSong])

    function changeIsPlaying(){
        setIsPlaying(!isPlaying)
    }
    function changeIsEditing(){
        setIsEditing(!isEditing)
        setTimeout(()=>{
            setIsEditing(false)
        },3000)
    }

    function handleDelete(){

    }
    return (
        <div className="flex space-between song-preview" onDoubleClick={()=>playSong(song)}>
            <div className="song-preview-section1">
                {isPlaying ?  <PauseCircleOutlineIcon className="song-preview-svg" onClick={changeIsPlaying}/> : <PlayCircleOutlineIcon className="song-preview-svg" onClick={()=>playSong(song)}/>}
                {song.name}
            </div>
            <div className="song-preview-section2"> 
                { isPlaying ? <img className="equalizer-gif" src={equalizer} alt=""/> : <div className="equalizer-gif"></div> }
                {song.duration}

            {isEditing ? <DeleteOutlineOutlinedIcon onClick={handleDelete} className= "song-preview-svg"/> : <MoreVertIcon onClick={changeIsEditing} className= "song-preview-svg" />}
             
             
            </div>
        </div>
    )
}

export default SongPreview
