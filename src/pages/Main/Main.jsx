import React, { useState } from 'react'
import Filter from '../../cmps/Filter/Filter'
import BoxList from '../../cmps/BoxList/BoxList'
//
import {playListService}from '../../services/playlistService.js'

function Main() {

    const [playList,setPlayList] = useState(playListService.getPlayLists())
    console.log(playList);
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
