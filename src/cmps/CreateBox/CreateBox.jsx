import React, { useState } from 'react'
import './CreateBox.scss'
import { Button, Input, InputLabel } from '@material-ui/core'

function CreateBox() {

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [genre, setGenre] = useState('')
    const [open, setOpen] = useState(false);
    const genres = ['Hip-hop', 'Electronic', 'Latin', 'Rock', 'Pop', 'Classical', 'alternativ', 'Blues', 'Disco', 'Israeli', 'Arabic']
    return (
        <form className="createBox modal">
            <InputLabel className="createBox__label" >Title</InputLabel>

            <Input
                className="createBox__input"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
            />
            <InputLabel className="createBox__label">Description</InputLabel>

            <Input
                className="createBox__input"
                placeholder="About the box"
                value={desc}
                onChange={(ev) => setDesc(ev.target.value)}
            />

            <InputLabel id="label" className="createBox__label">genre</InputLabel>


            <select value={genre} onChange={(ev) => setGenre(ev.target.value)}>
                {genres.map(g => {
                    return <option className="option" key={g} value={g}>{g}</option>
                })}
            </select>
            <Button >

            </Button>
        </form>
    )
}

export default CreateBox
