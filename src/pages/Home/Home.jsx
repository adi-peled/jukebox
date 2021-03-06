import React, { useEffect, useRef, useState } from 'react'
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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
//redux
import { useSelector, useDispatch } from 'react-redux'
import { loadBoxes } from '../../store/actions/boxActions'
function Home() {
    const { user } = useSelector(state => state.userReducer)
    const genres = ['Hip-hop', 'Electronic', 'Latin', 'Rock', 'Israeli', 'Pop']
    const { boxes } = useSelector((state) => state.boxReducer)
    const dispatch = useDispatch()
    const heroImgs = [heroImg7, heroImg2, heroImg6, heroImg4, heroImg5]
    const boxesRef = useRef()
    useEffect(() => {
        dispatch(loadBoxes({ genre: '', name: '' }))
    }, [])
    function handleClick() {
        boxesRef.current.scrollIntoView({ behavior: "smooth" });
    }
    return (
        <section className="home">
            {!boxes && <CircleLoading />}
            { boxes && <>
                <Carousel items={heroImgs} heroImgs />
                <h1 className="scroll-to-boxes" onClick={handleClick} >Enjoy The Beat</h1>
                <KeyboardArrowDownIcon onClick={handleClick} className="arrow-down"/>
                <div className="home-container">
                    {user?.favs.length > 0 && <h2 className="title">My Favorite Playlist</h2>}
                    {user?.favs && <Carousel items={user.favs} />}

                    <h2 ref={boxesRef} className="title">  Top Genres</h2>
                    {genres.map(genre => {
                        const filteredBoxes = boxes.filter(box => box.genre === genre)
                        return <div key={genre} className="genre-container">
                            <h3 className="sub-title">{genre}</h3>
                            <Carousel items={filteredBoxes} />
                        </div>
                    })}
                </div>
                {/* <Footer /> */}
            </>}

        </section>
    )
}

export default Home
