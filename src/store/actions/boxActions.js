import {youtubeService} from '../../services/youtubeService.js' 
import { boxService }from '../../services/boxService'

export const setCurrSong = (song) => async dispatch => {
    song = {...song, isPlaying: !song.isPlaying}
    dispatch({ type: 'SET_CURR_SONG', song })
}

export const loadBoxes = () => async dispatch => {
    const boxes = await boxService.getBoxes()
    dispatch({ type: 'LOAD_BOXES', boxes })
}
export const loadBox = (id) => async dispatch => {
    const box = await boxService.getBoxById(id)
    dispatch({ type: 'LOAD_BOX', box })
}

export const removeSong = (boxId,songId) => async dispatch => {
    let box = await boxService.getBoxById(boxId)
    box.playList = box.playList.filter(song => song._id!==songId)
    await boxService.updateBox(box)
    dispatch({ type: 'LOAD_BOX', box })

    // dispatch(loadBoxes())
    // dispatch({ type: 'REMOVE_SONG', box })
}

