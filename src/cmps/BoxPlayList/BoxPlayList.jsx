import React, { useEffect } from 'react'
import './BoxPlayList.scss'
import SongPreview from '../SongPreview/SongPreview'
function BoxPlayList({box, playSong, deleteSong}) {

    return (
        <div className="playlist">
            {box&& box.playList.map((song, idx)=>{
                return <SongPreview key={idx} song={song} playSong={playSong} deleteSong={deleteSong} />
            })}
        </div>
    )
}

export default BoxPlayList
