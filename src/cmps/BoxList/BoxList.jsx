import React,{useState,useEffect} from 'react'
import './BoxList.scss'
import BoxPreview from '../BoxPreview/BoxPreview'
function BoxList({ boxes, genre }) {

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
            {boxes && boxes.map(box => {
                return <BoxPreview key={box._id} box={box} />
            })
            }
        </section>
    )
}

export default BoxList
