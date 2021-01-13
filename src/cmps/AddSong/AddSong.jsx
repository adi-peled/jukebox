import React, { useEffect, useState, useCallback } from 'react'
import './AddSong.scss'
import { Input } from '@material-ui/core'
import { youtubeService } from '../../services/youtubeService';
import CancelIcon from '@material-ui/icons/Cancel';
import { debounce } from 'debounce';
function AddSong({ onClose, onAddSong }) {
    const [txt, setTxt] = useState('')
    const [songs, setSongs] = useState(null)
    const debounceLoadData = useCallback(debounce(fetchData, 1000), []);
    
    async function fetchData(txt) {
        setSongs(await youtubeService.get(txt))
    }
    useEffect(() => {
            debounceLoadData(txt);
    }, [txt])

    return (
        <form className="addSong" >
            <Input placeholder="Search Song" onChange={(ev) => setTxt(ev.target.value)} />
            {songs && <div className="addSong__songs">
                {songs.map(song => {
                    return <div key={song.id.videoId} className="addSong__song flex" onClick={() => onAddSong(song)}>
                        <img className="addSong__img" src={song.snippet.thumbnails.high.url} />
                        <span className="addSong__title"> {song.snippet.title}</span>
                    </div>
                })}
            </div>}

            <CancelIcon className="addSong__close" onClick={() => onClose(false)} />
        </form>

    )
}

export default AddSong