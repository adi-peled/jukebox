import React, { useState } from 'react'
import FileBase from 'react-file-base64'
import './CreateBox.scss'
import { Button, Input, InputLabel, Select, MenuItem } from '@material-ui/core'
import { ReactComponent as Upload } from '../../assets/upload.svg';
//redux
import { useDispatch, useSelector } from 'react-redux'
import { createBox, loadBoxes } from '../../store/actions/boxActions'
//img
import defaultImgRed from '../../assets/img/jukebox-red.png';
import defaultImgYellow from '../../assets/img/jukebox-yellow.png';
import defaultImgBlue from '../../assets/img/jukebox-blue.png';
import defaultImgGreen from '../../assets/img/jukebox-green.png';
function CreateBox({ openModal }) {
    const { user } = useSelector(state => state.userReducer)
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [genre, setGenre] = useState('Hip-hop')
    const [imgString, setImgString] = useState('')
    const genres = ['Hip-hop', 'Electronic', 'Latin', 'Rock', 'Pop',
        'Classical', 'alternativ', 'Blues', 'Disco', 'Israeli']
    const defaultImgs = [defaultImgBlue, defaultImgRed, defaultImgGreen, defaultImgYellow]


    function uploadImg(imgString) {
        console.log(imgString);
        setImgString(imgString)
    }

    function getRandomNumber() {
        return Math.floor(Math.random() * 4)
    }

    function onCreateBox() {
        const createdBy = user ? user.username : null
        let imgUrl
        // if (!name || !desc) return 
        if (!name) return // todo add note to user that need fill inputs
        if (!imgString) imgUrl = defaultImgs[getRandomNumber()]
        const box = {
            name,
            desc,
            genre,
            imgUrl: imgString ? imgString : imgUrl,
            createdBy,
            chat: [],
            playList: []
        }
        dispatch(createBox(box))
        openModal(false)
    }
    return (
        <form className="createBox modal flex">
            <h2>Create your own box !</h2>
            <div className="createBox__file-container flex">
                <FileBase type="file" multiple={false} onDone={({ base64 }) => uploadImg(base64)} />
                <Upload className={imgString ? "createBox__svg opacity-0" : "createBox__svg"} />
                {imgString && <img className="createBox__img" src={imgString} />}
            </div>

            <div>
                <InputLabel className="createBox__label" >Title</InputLabel>
                <Input
                    className="createBox__input"
                    placeholder="box title"
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                />
            </div>
            <div>
                <InputLabel className="createBox__label">Description</InputLabel>
                <Input
                    className="createBox__input"
                    placeholder="About the box"
                    value={desc}
                    onChange={(ev) => setDesc(ev.target.value)}
                />

            </div>
            <div>
                <InputLabel id="label" className="createBox__label">Genre</InputLabel>

                <select className="createBox__select" value={genre} onChange={(ev) => setGenre(ev.target.value)}>
                    {genres.map(g => {
                        return <option className="createBox__option" key={g} value={g}>{g}</option>
                    })}
                </select>
            </div>
            <Button onClick={onCreateBox}>
                create box
            </Button>
        </form >
    )
}

export default CreateBox
