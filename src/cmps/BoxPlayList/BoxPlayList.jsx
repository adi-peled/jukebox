import React from 'react'
import SongPreview from '../SongPreview/SongPreview'
function BoxPlayList({box, playSong}) {
    return (
        <div>
            {box&& box.playList.map(song=>{
                return <SongPreview key={song.vid} song={song} playSong={playSong}/>
            })}
        </div>
    )
}

export default BoxPlayList
