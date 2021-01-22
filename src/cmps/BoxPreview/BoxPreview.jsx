import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
// import playButton from '../../assets/img/play-button.svg'
import { ReactComponent as PlayButton } from '../../assets/img/play-button.svg'
import './BoxPreview.scss'
function BoxPreview({ box }) {
    const [showName, setShowName] = useState(false)

    return (
        <Link onMouseLeave={() => setShowName(false)}
            onMouseOver={() => setShowName(true)}
            className='boxPreview flex' to={`/boxDetails/${box._id}`}>
            <PlayButton className="play-icon" />
            {/* <PlayCircleOutlineIcon /> */}
            <img className={showName ? 'boxPreview__img brightness' : 'boxPreview__img'} src={box.imgUrl} />
            <div className="boxPreview__info flex" >
                {!showName && <span className="boxPreview__title">   {box.name}</span>}
                {showName && <span className="boxPreview__title fullName">   {box.name}</span>}
            </div>

        </Link>

    )
}

export default BoxPreview
