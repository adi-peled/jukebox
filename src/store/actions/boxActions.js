import { youtubeService } from '../../services/youtubeService.js'
import { boxService } from '../../services/boxService'
import { utilService } from '../../services/utilService'
import { socketService } from '../../services/socketService.js'

export const setCurrSong = (song) => dispatch => {
    console.log('set curr song action');

    song = { ...song, isPlaying: !song.isPlaying }
    dispatch({ type: 'SET_CURR_SONG', song })
}

export const loadBoxes = (filterBy) => async dispatch => {
    try {
        const boxes = await boxService.query(filterBy)
        dispatch({ type: 'LOAD_BOXES', boxes })
    } catch (err) {
        console.log(err);
    }
}

export const loadBox = (id) => async dispatch => {
    try {
        const box = await boxService.getById(id)
        dispatch({ type: 'LOAD_BOX', box })
        console.log(box.chat.length);

    } catch (err) {
        console.log(err);
    }
}

export const updateBox = box => async dispatch => {
    try {
        await boxService.save(box)
        console.log(box.chat.length);
        dispatch({ type: 'UPDATE_BOX', box })
    } catch (err) {
        console.log(err);
    }
}

export const loadBoxChat = (id) => async dispatch => {
    try {
        const box = await boxService.getById(id)
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
        const newBox = await boxService.save(box)
        console.log({ newBox });
        dispatch({ type: 'ADD_BOX', box: newBox })
    } catch (err) {
        console.log(err);
    }
}

export const removeSong = (boxId, songId) => async dispatch => {
    try {
        let box = await boxService.getById(boxId)
        box.playList = box.playList.filter(song => song.id !== songId)
        await boxService.save(box)
        dispatch({ type: 'LOAD_BOX', box })
    } catch (err) {
        console.log(err);
    }
}

export const addSong = (song, boxId) => async dispatch => {
    try {
        const box = await boxService.getById(boxId)
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
        await boxService.save(box)
        dispatch({ type: 'LOAD_BOX', box })
    } catch (err) {
        console.log(err);
    }
}



export function updateProgress(secPlayed) {
    return (dispatch, getState) => {
        const song = {
            ...getState().boxReducer.currSong, secPlayed
        }
        // socketService.emit('update song', song)
        socketService.emit('update sec', secPlayed)
        dispatch({ type: 'SET_CURR_SONG', song });
    }
}




