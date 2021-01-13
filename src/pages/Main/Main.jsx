import React, { useState, useEffect } from 'react'
import Filter from '../../cmps/Filter/Filter'
import BoxList from '../../cmps/BoxList/BoxList'
import './Main.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter, loadBoxes } from '../../store/actions/boxActions'
function Main(props) {

    const { boxes, filterBy } = useSelector((state) => state.boxReducer)
    const dispatch = useDispatch()


    useEffect(() => {
        let { genre } = props.match.params
        if (!genre) return
        dispatch(setFilter({ genre, name: '' }))
    }, [props.match.params])

    useEffect(() => {
        console.log({ filterBy });
        dispatch(loadBoxes(filterBy))
    }, [filterBy])

    return (
        <section className="main">
            <Filter />
            <BoxList boxes={boxes} />
        </section>
    )
}

export default Main
