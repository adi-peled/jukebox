import React, { useEffect, useState } from 'react'
import Carousel from '../Carousel/Carousel'
import './Filter.scss'
function Filter() {
    // const [filter, setFilter] = useState(null)
    const genres = ['All', 'Hip-hop', 'Electronic', 'Latin', 'Rock', 'Pop', 'Classical', 'Alternativ', 'Blues', 'Disco', 'Israeli']

    return (
        <div className="filter">
            <Carousel items={genres} />
        </div>
    )
}

export default Filter
