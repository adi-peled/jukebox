import {youtubeService} from '../../services/youtubeService.js' 
import { boxService }from '../../services/boxService'

export const setCurrSong = (song) => async dispatch => {
    dispatch({ type: 'PLAY_SONG', song })
}

export const loadBoxes = () => async dispatch => {
    const boxes = await boxService.getBoxes()
    dispatch({ type: 'LOAD_BOXES', boxes })
}

