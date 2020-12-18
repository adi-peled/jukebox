import React, { useEffect, useState } from 'react'
import './Filter.scss'
function Filter({ onFilter }) {
    const [filter, setFilter] = useState(null)
    const genres = ['All', 'Hip-hop', 'Electronic', 'Latin', 'Rock', 'Pop', 'Classical', 'alternativ', 'Blues', 'Disco', 'Israeli', 'Arabic']


    useEffect(() => {
        onFilter(filter)
    }, [filter])

    return (
        <div className="filter">
            <ul className="filter__list flex wrap">
                {genres.map(genre => {
                    return <li key={genre} className="filter__item" onClick={() => setFilter(genre)}>{genre}</li>
                })}

            </ul>
        </div>
    )
}

export default Filter
