import React, { useEffect, useState } from 'react'
import GenreCarousel from '../GenreCarousel/GenreCarousel'
import './Filter.scss'
function Filter({ onFilter }) {
    const [filter, setFilter] = useState(null)
    const genres = ['All', 'Hip-hop', 'Electronic', 'Latin', 'Rock', 'Pop', 'Classical', 'Alternativ', 'Blues', 'Disco', 'Israeli', 'Arabic']

    useEffect(() => {
        onFilter(filter)
    }, [filter])

    return (
        <div className="filter">
            <GenreCarousel genres={genres} />
        </div>
    )
}

export default Filter
