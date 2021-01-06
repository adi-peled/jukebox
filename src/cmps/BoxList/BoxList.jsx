import React, { useEffect } from 'react'
import './BoxList.scss'
import BoxPreview from '../BoxPreview/BoxPreview'
function BoxList({ genre,boxs }) {
    return (
        <section className="boxList grid">
           {boxs && boxs.map(box=>{
                return <BoxPreview key={box._id} box={box} />
            })
        }
        </section>
    )
}

export default BoxList
