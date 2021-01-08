import React, { useState } from 'react'
import FileBase from 'react-file-base64'
import './CreateBox.scss'
import { Button, Input, InputLabel, Select, MenuItem } from '@material-ui/core'
import { ReactComponent as Upload } from '../../assets/upload.svg';

function CreateBox() {

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [genre, setGenre] = useState('')
    const [open, setOpen] = useState(false);
    const [imgString, setImgString] = useState('')
    const genres = ['Hip-hop', 'Electronic', 'Latin', 'Rock', 'Pop',
        'Classical', 'alternativ', 'Blues', 'Disco', 'Israeli', 'Arabic']

    function uploadImg(imgString) {
        setImgString(imgString)
    }


    function createBox() {
        const box = { title, desc, genre, imgString }
        console.log(box);
    }
    return (
        <form className="createBox modal flex">
            <div className="createBox__file-container flex">
                <FileBase type="file"
                    multiple={false}
                    onDone={({ base64 }) => uploadImg(base64)}

                >
                </FileBase>
                <Upload className="createBox__svg" />
            </div>

            <div>
                <InputLabel className="createBox__label" >Title</InputLabel>
                <Input
                    className="createBox__input"
                    placeholder="box title"
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)}
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
                <InputLabel id="label" className="createBox__label">genre</InputLabel>

                <select className="createBox__select" value={genre} onChange={(ev) => setGenre(ev.target.value)}>
                    {genres.map(g => {
                        return <option className="createBox__option" key={g} value={g}>{g}</option>
                    })}
                </select>
            </div>
            <Button  onClick={createBox}>
            create box
            </Button>
        </form >
    )
}

export default CreateBox
