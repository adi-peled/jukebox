import React from 'react'
import SongPreview from '../SongPreview/SongPreview'
function BoxPlayList({box}) {
    return (
        <div>
            {box&& box.playList.map(song=>{
                return <SongPreview key={song.vid} song={song} />
            })}
        </div>
    )
}

export default BoxPlayList
