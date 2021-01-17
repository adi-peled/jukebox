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
import { setCurrSong, removeSong, loadBox, addSong, loadBoxChat, updateBox } from '../../store/actions/boxActions'
import { toggleLike } from '../../store/actions/userActions'
//Socket
import { io } from 'socket.io-client'
import { socketService } from '../../services/socketService'
let socket;

function BoxDetails(props) {

    const { id } = props.match.params
    const box = useSelector(state => state.boxReducer.currBox)
    const user = useSelector(state => state.userReducer.user)
    // const guest = useSelector(state => state.userReducer.guest)
    const dispatch = useDispatch();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [showAddSong, setShowAddSong] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [currCmp, setCurrCmp] = useState('BoxPlayList')
    const [showIsTyping, setShowIsTyping] = useState(null)
    useEffect(() => {

        if (user) {
            socket = io(socketService.getUrl())
            socket.on('get data', () => {
                let data
                data = { id, user }
                socket.emit('got data', data)
            })
            socket.on('user is typing', (username) => {
             setShowIsTyping(username)
            })
            socket.on('msgSent', (box) => {
                console.log('msg sent');

                dispatch(updateBox(box))
                // dispatch(loadBox(id))
            })
            socket.on('user joined', (user) => console.log('hellow user', user))
            //  //todo- render user joinned

            console.log(socket);
        }
        window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
        return () => {
            window.removeEventListener('resize', () => setScreenWidth(window.innerWidth))
        }
    }, [user])

    useEffect(() => {
        if (box?.playlist) dispatch(setCurrSong(box.playList[0]))
    }, [box])

    useEffect(() => {
        getCurrCmp()
    }, [currCmp])

    function getCurrCmp() {
        if (currCmp === 'Chat' && screenWidth < 850) {
            return <Chat isTyping={isTyping} sendMsg={sendMsg} box={box} />
        } else if (currCmp === 'BoxPlayList') {
            return <BoxPlayList playSong={playSong} deleteSong={deleteSong} box={box} />
        }
    }
    useEffect(() => {
        if (user) {
            const idx = user.favs.findIndex(favBox => favBox._id === id)
            idx === -1 ? setIsLiked(false) : setIsLiked(true)
        }
    }, [user?.favs?.length])





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
    function sendMsg(data) {
        dispatch(updateBox(data))
        socket.emit('sendMsg', data)
    }
    function isTyping(box, user) {
        console.log({ user });
        socket.emit('typing', box, user.username)
    }

    return (
        <div className="box-details">
            { box && <div className="box-details__container flex ">
                {screenWidth > 850 && <Chat
                    isTyping={isTyping}
                    sendMsg={sendMsg}
                    box={box}
                    typingUser={showIsTyping}
                />}

                <div className="box-details-section2">
                    <BoxInfo box={box} />
                    <SocialLinks isLiked={isLiked} onLike={onLike} showAddSong={setShowAddSong} setCurrCmp={setCurrCmp} currCmp={currCmp} />
                    {/* {<BoxPlayList playSong={playSong} deleteSong={deleteSong} box={box} />} */}
                    {getCurrCmp()}
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
