import React, { useEffect } from 'react'
import SongPreview from '../SongPreview/SongPreview'
function BoxPlayList({box, playSong, deleteSong}) {
    return (
        <div>
            {box&& box.playList.map(song=>{
                return <SongPreview key={song.videoId} song={song} playSong={playSong} deleteSong={deleteSong} />
            })}
        </div>
    )
}

export default BoxPlayList
