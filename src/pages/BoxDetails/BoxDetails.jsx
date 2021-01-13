import React, { useEffect, useState } from 'react'
//Scss
import './BoxDetails.scss'
//Services
import { boxService } from '../../services/boxService'
import { youtubeService } from '../../services/youtubeService'
//Components
import BoxPlayList from '../../cmps/BoxPlayList/BoxPlayList'
import Chat from '../../cmps/Chat/Chat'
import BoxInfo from '../../cmps/BoxInfo/BoxInfo'
import SocialLinks from '../../cmps/SocialLinks/SocialLinks'
import AddSong from '../../cmps/AddSong/AddSong'
//Redux
import { useDispatch, useSelector } from 'react-redux'
import { setCurrSong, removeSong, loadBox, addSong } from '../../store/actions/boxActions'
import { likeBox } from '../../store/actions/userActions'

function BoxDetails(props) {
    const { id } = props.match.params
    const box = useSelector(state => state.boxReducer.currBox)
    const user = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [showAddSong, setShowAddSong] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    useEffect(() => {
        window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
        return () => {
            window.removeEventListener('resize', () => setScreenWidth(window.innerWidth))
        }
    }, [])
    useEffect(() => {
        if (user && box) {
            console.log(user.favs);
            const favBox = user.favs.find(fav => {
                console.log(box._id, fav._id);
                return fav._id === box._id
            })
            // console.log(isLiked);
            console.log(favBox);
            // setIsLiked(liked) 
        }
    }, [user, box])

    useEffect(() => {
        dispatch(loadBox(id))
    }, [])

    function playSong(song) {
        dispatch(setCurrSong(song))
    }
    async function deleteSong(songId) {
        dispatch(removeSong(id, songId))
    }
    function onLike() {
        dispatch(likeBox(user, box))
    }


    const onAddSong = (song) => {
        dispatch(addSong(song, id))
    }


    return (
        <div className="box-details">
            { box && <div className="box-details__container flex ">
                {screenWidth > 850 && <Chat box={box} />}
                <div className="box-details-section2">
                    <BoxInfo box={box} />
                    <SocialLinks onLike={onLike} showAddSong={setShowAddSong} />
                    <BoxPlayList playSong={playSong} deleteSong={deleteSong} box={box} />
                </div>
            </div>
            }
            {showAddSong && <>
                <AddSong onClose={setShowAddSong} onAddSong={onAddSong} />
                <div onClick={() => setShowAddSong(false)} className="screen" />
            </>}
        </div>
    )
}


export default BoxDetails;
