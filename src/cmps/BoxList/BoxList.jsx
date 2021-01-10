import React from 'react'
import './BoxList.scss'
import BoxPreview from '../BoxPreview/BoxPreview'
function BoxList({ genre,boxes }) {
    return (
        <section className="boxList grid">
           {boxes && boxes.map(box=>{
                return <BoxPreview key={box._id} box={box} />
            })
        }
        </section>
    )
}

export default BoxList
