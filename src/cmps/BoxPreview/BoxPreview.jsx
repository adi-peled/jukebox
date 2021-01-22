import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import playButton from '../../assets/playButton.png'
import './BoxPreview.scss'
function BoxPreview({ box }) {
    const [showName, setShowName] = useState(false)


    return (
        <Link onMouseOut={() => setShowName(false)}
            onMouseOver={() => setShowName(true)}
            className="boxPreview flex" to={`/boxDetails/${box._id}`}>
                {showName&& <img src={playButton} className="bgi-playbutton" alt=""/>}
            <img className="boxPreview__img" src={box.imgUrl} />
            <div className="boxPreview__info flex" >
                {!showName && <span className="boxPreview__title">   {box.name}</span>}
                {showName && <span className="boxPreview__title fullName">   {box.name}</span>}
                {/* {!showName && <PlayCircleOutlineIcon />} */}
            </div>

        </Link>

    )
}

export default BoxPreview
