import React, { useState, useEffect } from 'react'
import './BoxList.scss'
import BoxPreview from '../BoxPreview/BoxPreview'
import Carousel from '../Carousel/Carousel'

function BoxList({ boxes, genre, carousel }) {

    const [filteredBoxes, setFilteredBoxes] = useState(null)

    // useEffect(() => {
    //     console.log(genre);
    //     if (genre) {
    //         setFilteredBoxes(boxes?.filter(box => box.genre === genre))
    //     } else {
    //         setFilteredBoxes(boxes)
    //     }
    // }, [genre])

    return (
        <section className="boxList grid">
            {!carousel && boxes && boxes.map(box => {
                return <BoxPreview key={box._id} box={box} />
            })
            }

            {/* {
                carousel && boxes && <Carousel items={boxes} />
            } */}
        </section>
    )
}

export default BoxList
