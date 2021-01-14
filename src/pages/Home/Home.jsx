import React, { useEffect, useState } from 'react'
import './Home.scss'
//cmps
import BoxList from '../../cmps/BoxList/BoxList'
import heroImg1 from '../../assets/img/hero1.jpg'
import heroImg2 from '../../assets/img/hero2.jpg'
import heroImg3 from '../../assets/img/hero3.jpg'
import { TweenLite } from 'gsap'
import Carousel from '../../cmps/Carousel/Carousel'
import Footer from '../../cmps/Footer/Footer';
//redux
import { useSelector, useDispatch } from 'react-redux'
import { loadBoxes } from '../../store/actions/boxActions'
import { boxService } from '../../services/boxService'
function Home() {
    const { user } = useSelector(state => state.userReducer)
    const genres = ['Hip-hop', 'Electronic', 'Latin', 'Rock', 'Israeli', 'Pop', 'Classical']
    const [myTween, setMyTween] = useState(null)
    const [myElement, setMyElement] = useState(null)
    const { boxes } = useSelector((state) => state.boxReducer)
    const dispatch = useDispatch()
const heroImgs=[heroImg1,heroImg2,heroImg3]

    useEffect(() => {
        // setMyTween(TweenLite.to(myElement, 1, { x: 100, y: 100 }))
    }, [myElement])


    useEffect(() => {
        dispatch(loadBoxes())
    }, [])

    return (
        <section className="home">
            {/* <img ref={div => setMyElement(div)} className="home__img" src={heroImg} /> */}
            <Carousel items={heroImgs} heroImgs />
            <div className="home-container">

                <h2 className="title">My Favorite Playlist</h2>
                {user?.favs && <Carousel items={user.favs} />}

                <h2 className="title">  Top Genres</h2>
                {boxes && genres.map(genre => {
                    const filteredBoxes = boxes.filter(box => box.genre === genre)
                    return <div key={genre} className="genre-container">
                        <h3 className="sub-title">{genre}</h3>
                        {/* <BoxList boxes={filteredBoxes} carousel /> */}
                        <Carousel items={filteredBoxes} />
                    </div>
                })}
            </div>
            <Footer />
        </section>
    )
}

export default Home
