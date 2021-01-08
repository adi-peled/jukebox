import React from 'react'
import { Link } from 'react-router-dom'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import './BoxPreview.scss'
function BoxPreview({ box }) {
    return (

        <Link className="boxPreview flex" to={`/boxDetails/${box._id}`}>
            <img className="boxPreview__img" src={box.imgUrl} />
            <div className="boxPreview__info flex" >
                <span className="boxPreview__title">   {box.name}</span>
                <PlayCircleOutlineIcon />
            </div>
        </Link>

    )
}

export default BoxPreview
