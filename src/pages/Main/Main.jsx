import React, { useState } from 'react'
import Filter from '../../cmps/Filter/Filter'
import BoxList from '../../cmps/BoxList/BoxList'
import './Main.scss'
import { boxService } from '../../services/boxService.js'

function Main() {

    const [boxs, setBoxs] = useState(boxService.getBoxs())
    const [genre, setGenre] = useState(null)

    function onFilter(filter) {
        setGenre(filter)
    }


    return (
        <section className="main">
            <Filter onFilter={onFilter} />
            <BoxList boxs={boxs} genre={genre} />
        </section>
    )
}

export default Main
