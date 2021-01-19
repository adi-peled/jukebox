import { youtubeService } from '../../services/youtubeService.js'
import { boxService } from '../../services/boxService'
import { utilService } from '../../services/utilService'

export const setCurrSong = (song) => async dispatch => {
    song = { ...song, isPlaying: !song.isPlaying }
    dispatch({ type: 'SET_CURR_SONG', song })
}

export const loadBoxes = (filterBy) => async dispatch => {
    try {
        const boxes = await boxService.getBoxes(filterBy)
        dispatch({ type: 'LOAD_BOXES', boxes })
    } catch (err) {
        console.log(err);
    }
}
export const loadBox = (id) => async dispatch => {
    try {
        const box = await boxService.getBoxById(id)
        dispatch({ type: 'LOAD_BOX', box })
    } catch (err) {
        console.log(err);
    }
}
export const updateBox = (data) => async dispatch => {
    try {
        data.currBox.chat.push(data.message)
        await boxService.updateBox(data.currBox)
        dispatch({ type: 'UPDATE_BOX', box: data.currBox })
    } catch (err) {
        console.log(err);
    }
}
export const loadBoxChat = (id) => async dispatch => {
    try {
        const box = await boxService.getBoxById(id)
        dispatch({ type: 'LOAD_BOX_CHAT', chat: box.chat })
    } catch (err) {
        console.log(err);
    }
}

export const setFilter = (filterBy) => async dispatch => {
    dispatch({ type: 'SET_FILTER', filterBy })
}


export const createBox = (box) => async dispatch => {
    try {
        const newBox = await boxService.createBox(box)
        dispatch({ type: 'ADD_BOX', box:newBox })
    } catch (err) {
        console.log(err);
    }
}

export const removeSong = (boxId, songId) => async dispatch => {
    try {
        let box = await boxService.getBoxById(boxId)
        box.playList = box.playList.filter(song => song.id !== songId)
        await boxService.updateBox(box)
        dispatch({ type: 'LOAD_BOX', box })
    } catch (err) {
        console.log(err);
    }
}



export const addSong = (song, boxId) => async dispatch => {
    try {
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
    } catch (err) {
        console.log(err);
    }

}



