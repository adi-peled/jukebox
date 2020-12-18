import React, { useState } from 'react'
import Filter from '../../cmps/Filter/Filter'
import BoxList from '../../cmps/BoxList/BoxList'
function Main() {

    const [genre, setGenre] = useState(null)
    function onFilter(filter) {
        setGenre(filter)
    }


    return (
        <section className="main">
            main page
            <Filter onFilter={onFilter} />
            <BoxList genre={genre} />
        </section>
    )
}

export default Main
