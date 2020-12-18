import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
        axios({
            method: "GET",
            url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=videos&q=${input}&key=AIzaSyDT9sOsVrKS57kBtrHqmY0FOgykI0fhOrY`
        })
        .then(res => {
             console.log(res.data);
             setVideoId(res.data.items[0].id.videoId)
        })
        .catch(error => {
            console.log(error)
        })
        console.log(videoId,'hi');
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
