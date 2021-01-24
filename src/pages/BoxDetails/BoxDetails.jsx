// import React, { useEffect, useState, useCallback } from 'react'
// import { debounce } from 'debounce';
// //Scss
// import './BoxDetails.scss'
// //Components
// import { CircleLoading } from 'react-loadingg';
// import BoxPlayList from '../../cmps/BoxPlayList/BoxPlayList'
// import Chat from '../../cmps/Chat/Chat'
// import BoxInfo from '../../cmps/BoxInfo/BoxInfo'
// import SocialLinks from '../../cmps/SocialLinks/SocialLinks'
// import AddSong from '../../cmps/AddSong/AddSong'
// //Redux
// import { useDispatch, useSelector } from 'react-redux'
// import { setCurrSong, removeSong, loadBox, addSong, updateBox } from '../../store/actions/boxActions'
// import { toggleLike } from '../../store/actions/userActions'
// //Socket
// import { socketService } from '../../services/socketService'
// import { boxService } from '../../services/boxService'

// function BoxDetails(props) {
//     const { id } = props.match.params
//     const box = useSelector(state => state.boxReducer.currBox)
//     const { currSong } = useSelector(state => state.boxReducer)

//     const user = useSelector(state => state.userReducer.user)
//     const dispatch = useDispatch();
//     const [screenWidth, setScreenWidth] = useState(window.innerWidth)
//     const [showAddSong, setShowAddSong] = useState(false)
//     const [isLiked, setIsLiked] = useState(false)
//     const [currCmp, setCurrCmp] = useState('BoxPlayList')
//     const [showIsTyping, setShowIsTyping] = useState(null)
//     const [showJoinedUser, setShowJoinedUser] = useState(null)
//     const [showNewSong, setShowNewSong] = useState(null)
//     const debounceLoadData = useCallback(debounce(fetchData, 1500), []);
//     const [userList, setUserList] = useState(null)
//     const [newSong, setNewSong] = useState('')
//     useEffect(() => {
//         dispatch(loadBox(id))
//     }, [])
//     useEffect(() => {
//         if (user) {
//             const idx = user.favs.findIndex(favBox => favBox._id === id)
//             idx === -1 ? setIsLiked(false) : setIsLiked(true)
//         }
//     }, [user?.favs?.length])
//     useEffect(() => {
//         if (user) {
//             socketService.emit('join box', { boxId: id, user })
//         }
//         socketService.on('user is typing', (username) => {
//             setShowIsTyping(username)
//             debounceLoadData();
//         })
//         socketService.on('msgSent', () => {
//             dispatch(loadBox(id))
//         })
//         socketService.on('user joined', ({ username, userList }) => onJoinedUser(username, userList))
//         socketService.on('user leave', (updateUserList) => {
//             setUserList(updateUserList)
//         })
//         socketService.on('set song', async song => {
//             if (!song) {
//                 const box = await boxService.getBoxById(id)
//                 const firstSong = { ...box.playList[0], isPlaying: true }
//                 console.log({firstSong});
//                 dispatch(setCurrSong(firstSong))
//                 socketService.emit('update song', firstSong)
//             } else {
//                 console.log({ song });
//                 setNewSong(song)
//                 dispatch(setCurrSong(song))
//             }
//         })
//         window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
//         return () => {
//             window.removeEventListener('resize', () => setScreenWidth(window.innerWidth))
//         }
//     }, [user])

//     const onJoinedUser = (username, userList) => {
//         setShowJoinedUser(username)
//         setUserList(userList)
//         setTimeout(() => {
//             setShowJoinedUser(null)
//         }, 5000)
//     }

//     useEffect(() => {
//         if (!currSong && !newSong) return
//         if (newSong.videoId === currSong.videoId) return
//         console.log('curr song change');
//         socketService.emit('update song', { ...currSong, isPlaying: !currSong.isPlaying })
//     }, [currSong])
//     async function fetchData() {
//         setShowIsTyping(null)
//     }
//     useEffect(() => {
//         getCurrCmp()
//     }, [currCmp])
//     function getCurrCmp() {
//         if (currCmp === 'Chat' && screenWidth < 850) {
//             return <Chat userList={userList} isTyping={isTyping} sendMsg={sendMsg} box={box} />
//         } else if (currCmp === 'BoxPlayList') {
//             return <BoxPlayList playSong={playSong} deleteSong={deleteSong} box={box} />
//         }
//     }
//     function playSong(song) {
//         dispatch(setCurrSong({ ...song, isPlaying: !song.isPlaying, secPlayed: 0 }))
//     }
//     async function deleteSong(songId) {
//         dispatch(removeSong(id, songId))
//     }
//     function onLike() {
//         dispatch(toggleLike(user, box, isLiked))
//     }
//     const onAddSong = (song) => {
//         dispatch(addSong(song, id))
//         setShowNewSong(song.snippet.title)
//         setTimeout(() => {
//             setShowNewSong(null)
//         }, 3000)
//     }
//     function sendMsg(data) {
//         dispatch(updateBox(data))
//         socketService.emit('sendMsg', data)
//     }
//     function isTyping(box, user) {
//         socketService.emit('typing', { box, username: user.username })
//     }
//     return (
//         <div className="box-details">
//             { !box && <CircleLoading />}
//             { box && <>
//                 <div className="box-details__container flex ">
//                     {screenWidth > 850 && <Chat
//                         isTyping={isTyping}
//                         userList={userList}
//                         sendMsg={sendMsg}
//                         box={box}
//                         typingUser={showIsTyping}
//                         joinedUser={showJoinedUser}
//                         newSong={showNewSong}
//                     />}

//                     <div className="box-details-section2">
//                         <BoxInfo box={box} />
//                         <SocialLinks isLiked={isLiked} onLike={onLike} showAddSong={setShowAddSong} setCurrCmp={setCurrCmp} currCmp={currCmp} />
//                         {screenWidth > 850 && <BoxPlayList playSong={playSong} deleteSong={deleteSong} box={box} />}
//                         {screenWidth < 850 && <>{getCurrCmp()}</>}
//                     </div>
//                 </div>
//                 {showAddSong && <>
//                     <AddSong onClose={setShowAddSong} onAddSong={onAddSong} />
//                     <div onClick={() => setShowAddSong(false)} className="screen" />
//                 </>}
//             </>}
//         </div>
//     )
// }
// export default BoxDetails;


import React, { useEffect, useState, useCallback } from 'react'
import { debounce } from 'debounce';
//Scss
import './BoxDetails.scss'
//Components
import { CircleLoading } from 'react-loadingg';
import BoxPlayList from '../../cmps/BoxPlayList/BoxPlayList'
import Chat from '../../cmps/Chat/Chat'
import BoxInfo from '../../cmps/BoxInfo/BoxInfo'
import SocialLinks from '../../cmps/SocialLinks/SocialLinks'
import AddSong from '../../cmps/AddSong/AddSong'
//Redux
import { useDispatch, useSelector } from 'react-redux'
import { setCurrSong, removeSong, loadBox, addSong, updateBox, loadBoxChat } from '../../store/actions/boxActions'
import { toggleLike } from '../../store/actions/userActions'
//Socket
import { socketService } from '../../services/socketService'
import { boxService } from '../../services/boxService'

function BoxDetails(props) {
    const [id, setId] = useState(props.match.params.id)
    const box = useSelector(state => state.boxReducer.currBox)
    const { currSong } = useSelector(state => state.boxReducer)
    const user = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [showAddSong, setShowAddSong] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [currCmp, setCurrCmp] = useState('BoxPlayList')
    const [showIsTyping, setShowIsTyping] = useState(null)
    const [showJoinedUser, setShowJoinedUser] = useState(null)
    const [showNewSong, setShowNewSong] = useState(null)
    const debounceLoadData = useCallback(debounce(fetchData, 1500), []);
    const [userList, setUserList] = useState(null)
    const [newSong, setNewSong] = useState(null)

    useEffect(() => {
        setId(props.match.params.id)
    }, [props.match.params])

    useEffect(() => {
        dispatch(loadBox(id))
    }, [])

    useEffect(() => {
        if (user) {
            const idx = user.favs.findIndex(favBox => favBox._id === id)
            idx === -1 ? setIsLiked(false) : setIsLiked(true)
        }
    }, [user?.favs?.length])

    useEffect(() => {
        if (user) {
            socketService.emit('join box', { boxId: id, user })
        }
        socketService.on('user is typing', (username) => {
            setShowIsTyping(username)
            debounceLoadData();
        })
        socketService.on('msgSent', () => {
            dispatch(loadBox(id))
        })
        socketService.on('user joined', ({ username, userList }) => onJoinedUser(username, userList))
        socketService.on('user leave', (updateUserList) => {

            setUserList(updateUserList)
        })
        socketService.on('set song', async song => {
            if (!song) {
                const box = await boxService.getBoxById(id)
                const song = { ...box.playList[0], secPlayed: 0 }
                dispatch(setCurrSong(song))
                socketService.emit('update song', song)
            } else {
                setNewSong(song)
                console.log(song);
                dispatch(setCurrSong(song))
            }
        })
        window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
        return () => {
            window.removeEventListener('resize', () => setScreenWidth(window.innerWidth))
        }
    }, [user])

    const onJoinedUser = (username, userList) => {
        setShowJoinedUser(username)
        setUserList(userList)
        setTimeout(() => {
            setShowJoinedUser(null)
        }, 5000)
    }

    useEffect(() => {

        if (!currSong || !newSong) return
        if (newSong.videoId === currSong.videoId) return
        socketService.emit('update song', { ...currSong, isPlaying: !currSong.isPlaying })

    }, [currSong])

    async function fetchData() {
        setShowIsTyping(null)
    }

    useEffect(() => {
        getCurrCmp()
    }, [currCmp])

    function getCurrCmp() {
        if (currCmp === 'Chat' && screenWidth < 850) {
            return <Chat userList={userList} isTyping={isTyping} sendMsg={sendMsg} box={box} />
        } else if (currCmp === 'BoxPlayList') {
            return <BoxPlayList playSong={playSong} deleteSong={deleteSong} box={box} />
        }
    }

    function playSong(song) {
        console.log(song);
        if (song.videoId !== currSong?.videoId) {
            song = { ...song, secPlayed: 0 }
        } 
        else {
            song = { ...song, isPlaying: song.isPlaying }
        }
        dispatch(setCurrSong(song))
        socketService.emit('update song', song)
        // socketService.emit('update song', { ...song, isPlaying: !song.isPlaying })
        setNewSong(song)
    }
    async function deleteSong(songId) {
        dispatch(removeSong(id, songId))
    }
    function onLike() {
        dispatch(toggleLike(user, box, isLiked))
    }
    const onAddSong = (song) => {
        dispatch(addSong(song, id))
        setShowNewSong(song.snippet.title)
        setTimeout(() => {
            setShowNewSong(null)
        }, 3000)
    }
    function sendMsg(data) {
        dispatch(updateBox(data))
        socketService.emit('sendMsg', data)
    }
    function isTyping(box, user) {
        socketService.emit('typing', { box, username: user.username })
    }

    return (
        <div className="box-details">
            { !box && <CircleLoading />}
            { box && <>
                <div className="box-details__container flex ">
                    {screenWidth > 850 && <Chat
                        isTyping={isTyping}
                        userList={userList}
                        sendMsg={sendMsg}
                        box={box}
                        typingUser={showIsTyping}
                        joinedUser={showJoinedUser}
                        newSong={showNewSong}
                    />}

                    <div className="box-details-section2">
                        <BoxInfo box={box} />
                        <SocialLinks isLiked={isLiked} onLike={onLike} showAddSong={setShowAddSong} setCurrCmp={setCurrCmp} currCmp={currCmp} />
                        {screenWidth > 850 && <BoxPlayList playSong={playSong} deleteSong={deleteSong} box={box} />}
                        {screenWidth < 850 && <>{getCurrCmp()}</>}
                    </div>
                </div>
                {showAddSong && <>
                    <AddSong onClose={setShowAddSong} onAddSong={onAddSong} />
                    <div onClick={() => setShowAddSong(false)} className="screen" />
                </>}
            </>}



        </div>
    )
}


export default BoxDetails;