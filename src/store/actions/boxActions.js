import { youtubeService } from '../../services/youtubeService.js'
import { boxService } from '../../services/boxService'
import { utilService } from '../../services/utilService'

export const setCurrSong = (song) => async dispatch => {
    song = { ...song, isPlaying: !song.isPlaying }
    dispatch({ type: 'SET_CURR_SONG', song })
}

export const loadBoxes = (filterBy) => async dispatch => {
    const boxes = await boxService.getBoxes(filterBy)
    dispatch({ type: 'LOAD_BOXES', boxes })
}
export const loadBox = (id) => async dispatch => {
    const box = await boxService.getBoxById(id)
    dispatch({ type: 'LOAD_BOX', box })
}

export const setFilter = (filterBy) => async dispatch => {
    dispatch({ type: 'SET_FILTER', filterBy })
}


export const createBox = (box) => async dispatch => {
    await boxService.createBox(box)
    dispatch({ type: 'ADD_BOX', box })
}

export const removeSong = (boxId, songId) => async dispatch => {
    let box = await boxService.getBoxById(boxId)
    box.playList = box.playList.filter(song => song.id !== songId)
    await boxService.updateBox(box)
    dispatch({ type: 'LOAD_BOX', box })
}

export const addSong = (song, boxId) => async dispatch => {
    const box = await boxService.getBoxById(boxId)
    const { videoId } = song.id
    const newSong = {
        id: utilService.makeId(),
        videoId,
        name: song.snippet.title,
        imgUrl: song.snippet.thumbnails.default.url,
        duration: await youtubeService.getDuration(videoId, song.contentDetails?.duration),
        isPlaying: false
    }
    box.playList.push(newSong)
    await boxService.updateBox(box)
    dispatch({ type: 'LOAD_BOX', box })
}



