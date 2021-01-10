import {youtubeService} from '../../services/youtubeService.js' 

export const setCurrSong = (song) => async dispatch => {
    dispatch({ type: 'PLAY_SONG', song })
}

