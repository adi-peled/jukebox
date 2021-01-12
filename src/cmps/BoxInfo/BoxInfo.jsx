import React from 'react'
import './BoxInfo.scss'

function BoxInfo({ box }) {
    return (
        <div className="box-info flex">
            <div>
                <img className="box-info-img" src={box.imgUrl} alt="" />
            </div>
            <div className="box-desc">
                <p>name: {box.name}</p>
                <p>genre: {box.genre}</p>
                <p>created by: {box.createdBy ? box.createdBy : 'guest'}</p>
            </div>
        </div>
    )
}

export default BoxInfo
