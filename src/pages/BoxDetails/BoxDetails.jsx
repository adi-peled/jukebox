import React, { useEffect, useState } from 'react'
//Scss
import './BoxDetails.scss'
//Components
import BoxPlayList from '../../cmps/BoxPlayList/BoxPlayList'
import Chat from '../../cmps/Chat/Chat'
import BoxInfo from '../../cmps/BoxInfo/BoxInfo'
import SocialLinks from '../../cmps/SocialLinks/SocialLinks'
import AddSong from '../../cmps/AddSong/AddSong'
//Redux
import { useDispatch, useSelector } from 'react-redux'
import { setCurrSong, removeSong, loadBox, addSong } from '../../store/actions/boxActions'
import { toggleLike } from '../../store/actions/userActions'
//Socket
import { io } from 'socket.io-client'
import { socketService } from '../../services/socketService'
let socket ;

function BoxDetails(props) {

    const { id } = props.match.params
    const box = useSelector(state => state.boxReducer.currBox)
    const user = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [showAddSong, setShowAddSong] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    useEffect(() => {
        socket = io(socketService.getUrl())
        console.log(socket);
        window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
        return () => {
            window.removeEventListener('resize', () => setScreenWidth(window.innerWidth))
        }
    }, [])

    useEffect(() => {
       if (box) dispatch(setCurrSong(box.playList[0]))
    }, [box])

    useEffect(() => {
        if (user) {
            const liked = user.favs.includes(id)
            setIsLiked(liked)
        }
    }, [ user?.favs?.length])


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
        dispatch(toggleLike(user, id, isLiked))
    }
    const onAddSong = (song) => {
        dispatch(addSong(song, id))
    }
    function checkIo(){
        io().emit('check','checking')
    }

    return (
        <div className="box-details">
            { box && <div className="box-details__container flex ">
                {screenWidth > 850 && <Chat box={box} />}
                <div className="box-details-section2">
                    <BoxInfo box={box} />
                    <SocialLinks isLiked={isLiked} onLike={onLike} showAddSong={setShowAddSong} />
                    <BoxPlayList playSong={playSong} deleteSong={deleteSong} box={box} />
                </div>
            </div>
            }
            {showAddSong && <>
                <AddSong onClose={setShowAddSong} onAddSong={onAddSong} />
                <div onClick={() => setShowAddSong(false)} className="screen" />
            </>}
            <button onClick={checkIo}></button>
        </div>
    )
}


export default BoxDetails;
