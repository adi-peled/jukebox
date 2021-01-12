import React, { useState } from 'react'
import './AddSong.scss'
import { Input } from '@material-ui/core'
import { youtubeService } from '../../services/youtubeService';
import CancelIcon from '@material-ui/icons/Cancel';

function AddSong({ onClose ,onAddSong}) {
    const [txt, setTxt] = useState('')
    const [songs, setSongs] = useState(null)
    const search = async (ev) => {
        ev.preventDefault()
        setSongs(await youtubeService.get(txt))
    }

   

    return (
        <form className="addSong" onSubmit={(ev) => search(ev)} >
            <Input placeholder="Search Song" onChange={(ev) => setTxt(ev.target.value)} />
            {songs && <div className="addSong__songs">
                {songs.map(song => {
                    return <div key={song.id.videoId} className="addSong__song" onClick={() => onAddSong(song)}>
                        {song.snippet.title}
                    </div>
                })}
            </div>}

            <CancelIcon className="addSong__close" onClick={() => onClose(false)} />
        </form>

    )
}

export default AddSong
