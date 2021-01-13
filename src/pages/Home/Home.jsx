import React, { useEffect, useState } from 'react'
import './Home.scss'
//cmps
import BoxList from '../../cmps/BoxList/BoxList'
import heroImg from '../../assets/img/hero2.jpg'
import { TweenLite } from 'gsap'
import Carousel from '../../cmps/Carousel/Carousel'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { loadBoxes } from '../../store/actions/boxActions'
function Home() {

    const genres = ['Hip-hop', 'Electronic', 'Latin', 'Rock','Israeli', 'Pop', 'Classical']
    const [myTween, setMyTween] = useState(null)
    const [myElement, setMyElement] = useState(null)
    const { boxes } = useSelector((state) => state.boxReducer)
    const dispatch = useDispatch()


    useEffect(() => {
        // setMyTween(TweenLite.to(myElement, 1, { x: 100, y: 100 }))
    }, [myElement])


    useEffect(() => {
        dispatch(loadBoxes())
    }, [])



    return (
        <section className="home">
            <img ref={div => setMyElement(div)} className="home__img" src={heroImg} />
            <h2>  Top Genres</h2>
            {boxes && genres.map(genre => {
                const filteredBoxes = boxes.filter(box => box.genre === genre)
                return <div key={genre} className="genre-container">
                    <h3>{genre}</h3>
                    {/* <BoxList boxes={filteredBoxes} carousel /> */}
                    <Carousel items={filteredBoxes} />
                </div>
            })}

        </section>
    )
}

export default Home
