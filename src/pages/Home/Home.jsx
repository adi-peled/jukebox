import React, { useEffect, useState } from 'react'
import './Home.scss'
//cmps
import heroImg6 from '../../assets/img/hero6.jpg'
import heroImg2 from '../../assets/img/hero2.jpg'
import heroImg7 from '../../assets/img/hero7.jpg'
import heroImg4 from '../../assets/img/hero4.jpg'
import heroImg5 from '../../assets/img/hero5.jpg'
import { CircleLoading } from 'react-loadingg';
import Carousel from '../../cmps/Carousel/Carousel'
import Footer from '../../cmps/Footer/Footer';
//redux
import { useSelector, useDispatch } from 'react-redux'
import { loadBoxes } from '../../store/actions/boxActions'
import { boxService } from '../../services/boxService'
function Home() {
    const { user } = useSelector(state => state.userReducer)
    const genres = ['Hip-hop', 'Electronic', 'Latin', 'Rock', 'Israeli', 'Pop', 'Classical']
    const { boxes } = useSelector((state) => state.boxReducer)
    const dispatch = useDispatch()
    const heroImgs = [heroImg7, heroImg2, heroImg6, heroImg4, heroImg5]

    useEffect(() => {
        dispatch(loadBoxes())
    }, [])

    return (
        <section className="home">
            {!boxes && <CircleLoading />}
            { boxes && <>
                <Carousel items={heroImgs} heroImgs />
                <div className="home-container">
                    {user && <h2 className="title">My Favorite Playlist</h2>}
                    {user?.favs && <Carousel items={user.favs} />}

                    <h2 className="title">  Top Genres</h2>
                    {genres.map(genre => {
                        const filteredBoxes = boxes.filter(box => box.genre === genre)
                        return <div key={genre} className="genre-container">
                            <h3 className="sub-title">{genre}</h3>
                            {/* <BoxList boxes={filteredBoxes} carousel /> */}
                            <Carousel items={filteredBoxes} />
                        </div>
                    })}
                </div>
                <Footer />
            </>}

        </section>
    )
}

export default Home
