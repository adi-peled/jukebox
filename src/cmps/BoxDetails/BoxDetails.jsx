import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { youtubeService } from '../../services/youtubeService.js'
import YouTube from 'react-youtube'
function BoxDetails() {
    
    const [videoId, setVideoId] = useState('')
    const [input, setInput] = useState('')
    
     const opts = {
            height: '300',
            width: '300',
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
            }
        }

   

    function showSongObj(event){
        event.preventDefault()
        youtubeService.get(input)
        .then(res=>{
            console.log(res);
            setVideoId(res.items[0].id.videoId)
        })
      
    }
    return (
        <div>
            <form action="">
                <input placeholder="Look for a song" value={input} onChange={(event) => setInput(event.target.value)} type="search"/>
                <button onClick={ (event) => showSongObj(event)}>Search</button>
            </form>
            { videoId&&<YouTube videoId={ videoId } opts={opts}  />}
        </div>
    )
}

export default BoxDetails
