import React, { useEffect, useState } from 'react'
import './Home.scss'
//cmps
import BoxList from '../../cmps/BoxList/BoxList'
import heroImg from '../../assets/img/hero2.jpg'
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
    const [userFavsBoxes, setUserFavsBoxes] = useState(null)


    useEffect(() => {
        // setMyTween(TweenLite.to(myElement, 1, { x: 100, y: 100 }))
    }, [myElement])


    useEffect(() => {
        dispatch(loadBoxes())

    }, [])

    useEffect(() => {
        if (user && boxes) {
            let favBoxes = [];
            user.favs.forEach((favId) => {
                const filteredBoxes = boxes.filter(box => box._id === favId)
                favBoxes.push(...filteredBoxes)
            })
            setUserFavsBoxes(favBoxes)
        }
    }, [user?.favs, boxes])



    return (
        <section className="home">
            <img ref={div => setMyElement(div)} className="home__img" src={heroImg} />

            <h2 className="title">My Favorite Playlist</h2>
            {userFavsBoxes && <Carousel items={userFavsBoxes} />}

            <h2 className="title">  Top Genres</h2>
            {boxes && genres.map(genre => {
                const filteredBoxes = boxes.filter(box => box.genre === genre)
                return <div key={genre} className="genre-container">
                    <h3>{genre}</h3>
                    {/* <BoxList boxes={filteredBoxes} carousel /> */}
                    <Carousel items={filteredBoxes} />
                </div>
            })}
            <Footer />
        </section>
    )
}

export default Home
