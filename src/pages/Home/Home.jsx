import React, { useEffect, useState } from 'react'
import './Home.scss'
import BoxList from '../../cmps/BoxList/BoxList'
import heroImg from '../../assets/img/hero1.jpg'
import { TweenLite } from 'gsap'
function Home() {

    const genres = ['Hip-hop', 'Electronic', 'Latin', 'Rock', 'Pop', 'Classical']
    const [myTween, setMyTween] = useState(null)
    const [myElement, setMyElement] = useState(null)


    useEffect(() => {
        // setMyTween(TweenLite.to(myElement, 1, { x: 100, y: 100 }))
    }, [myElement])
    return (
        <section className="home">
            <img ref={div => setMyElement(div)} className="home__img" src={heroImg} />
            <h2>  Top Genres</h2>
            {genres.map(genre => {
                return <div key={genre} className="genre">
                    <h3>{genre}</h3>
                    <BoxList genre={genre} />
                </div>
            })}

        </section>
    )
}

export default Home
