import React from 'react'
import './BoxInfo.scss'

function BoxInfo({ box }) {
    return (
        <div className="box-info flex">
            <div>
                <img className="box-info__img" src={box.imgUrl} />
            </div>
            <div className="box-info__details">
                <h3 className="title">
                    {box.name}
                </h3>
                <p className="box-info__desc">
                    {box.desc}
                </p>
                <span className="box-info__genre">  {box.genre}</span>
                <p>created by: {box.createdBy ? box.createdBy : 'guest'}</p>
            </div>
        </div>
    )
}

export default BoxInfo
