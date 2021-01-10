import React, { useState, useEffect } from 'react'
import Filter from '../../cmps/Filter/Filter'
import BoxList from '../../cmps/BoxList/BoxList'
import './Main.scss'
import { boxService } from '../../services/boxService.js'
import { useSelector, useDispatch} from 'react-redux'
import { loadBoxes } from '../../store/actions/boxActions'
function Main() {

    const { boxes }= useSelector((state)=>state.boxReducer)
    const [genre, setGenre] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadBoxes())

    }, [])



    function onFilter(filter) {
        setGenre(filter)
    }


    return (
        <section className="main">
            <Filter onFilter={onFilter} />
            <BoxList boxes={boxes} genre={genre} />
        </section>
    )
}

export default Main
