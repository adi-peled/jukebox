import React, { useState, useEffect } from 'react'
import Filter from '../../cmps/Filter/Filter'
import BoxList from '../../cmps/BoxList/BoxList'
import './Main.scss'
import { useSelector, useDispatch } from 'react-redux'
import { loadBoxes } from '../../store/actions/boxActions'
function Main(props) {

    const { boxes } = useSelector((state) => state.boxReducer)
    const dispatch = useDispatch()


    useEffect(() => {
        const genre= props.match.params.genre?  props.match.params.genre :''
        const filterBy = {
            genre
        }
        dispatch(loadBoxes(filterBy))
    }, [props.match.params])


    return (
        <section className="main">
            <Filter />
            <BoxList boxes={boxes} />
        </section>
    )
}

export default Main
