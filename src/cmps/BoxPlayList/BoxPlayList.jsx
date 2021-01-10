import React from 'react'
import SongPreview from '../SongPreview/SongPreview'
function BoxPlayList({box, playSong, currSong}) {
    return (
        <div>
            {box&& box.playList.map(song=>{
                return <SongPreview key={song.videoId} song={song} playSong={playSong} />
            })}
        </div>
    )
}

export default BoxPlayList
