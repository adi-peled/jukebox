import React, { useEffect } from 'react'
import './BoxPlayList.scss'
import SongPreview from '../SongPreview/SongPreview'
function BoxPlayList({box, playSong, deleteSong}) {

    return (
        <div className="playlist">
            {box&& box.playList.map(song=>{
                return <SongPreview key={song.videoId} song={song} playSong={playSong} deleteSong={deleteSong} />
            })}
        </div>
    )
}

export default BoxPlayList
