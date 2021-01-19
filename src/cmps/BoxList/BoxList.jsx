import React, { useState, useEffect } from 'react'
import './BoxList.scss'
import BoxPreview from '../BoxPreview/BoxPreview'
import Carousel from '../Carousel/Carousel'

function BoxList({ boxes,  carousel }) {



    return (
        <section className="boxList grid">
            {!carousel && boxes && boxes.map(box => {
                return <BoxPreview key={box._id} box={box} />
            })
            }
        </section>
    )
}

export default BoxList
