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
        socket.on('get box id',()=>{
            socket.emit('box id',id)
        })
        socket.on('msgSent',()=>{
            dispatch(loadBox(id))
        })
        socket.on('user joined',()=>console.log('hellow user'))

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
            const idx = user.favs.findIndex(favBox => favBox._id === id)
            idx === -1 ? setIsLiked(false) : setIsLiked(true)
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
        dispatch(toggleLike(user, box, isLiked))
    }
    const onAddSong = (song) => {
        dispatch(addSong(song, id))
    }
    function sendMsg(data){
        socket.emit('sendMsg',data)
    }
    function isTyping(box,userName){
        socket.emit('typing',box,userName)
    }

    return (
        <div className="box-details">
            { box && <div className="box-details__container flex ">
                {screenWidth > 850 && <Chat isTyping={isTyping} sendMsg={sendMsg} box={box} />}
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
        </div>
    )
}


export default BoxDetails;
