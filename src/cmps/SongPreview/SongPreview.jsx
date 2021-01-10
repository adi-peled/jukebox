import React, { useState, useEffect, } from 'react'
//Css
import './SongPreview.scss'
//Components
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import equalizer from '../../assets/equalizer.gif'
//redux
import { useDispatch, useSelector } from 'react-redux'

function SongPreview({song, playSong}) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isRemoving, setIsRemoving] = useState(false)
    const {currSong} =  useSelector(state => state.boxReducer)

    useEffect(() => {
        if(currSong){
            if(song.videoId===currSong.videoId){
                setIsPlaying(true)
            }else{
                setIsPlaying(false)
            }
        }
    }, [currSong])

    function changeIsPlaying(){
        setIsPlaying(!isPlaying)
    }
    function changeIsRemoving(){
        setIsRemoving(!isRemoving)
        setTimeout(()=>{
            setIsRemoving(false)
        },3000)
    }

    function handleDelete(){

    }
    return (
        <div className="flex space-between song-preview" onDoubleClick={()=>playSong(song)}>
            <div className="song-preview-section1">
                {isPlaying ?  <PauseCircleOutlineIcon className="song-preview-svg" onClick={changeIsPlaying}/> : <PlayCircleOutlineIcon className="song-preview-svg" onClick={()=>playSong(song)}/>}
                <div>{song.name}</div>

            </div>
            <div className="song-preview-section2"> 
                { isPlaying ? <img className="equalizer-gif" src={equalizer} alt=""/> : <div className="equalizer-gif"></div> }
                <div>{song.duration}</div>

            {isRemoving ? <DeleteOutlineOutlinedIcon onClick={handleDelete} className= "song-preview-svg"/> : <MoreVertIcon onClick={changeIsRemoving} className= "song-preview-svg" />}
             
             
            </div>
        </div>
    )
}

export default SongPreview
