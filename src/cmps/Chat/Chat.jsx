import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Input, TextField } from '@material-ui/core'

import './Chat.scss'
function Chat({ box, sendMsg, isTyping, typingUser, joinedUser, newSong, userList }) {
    const [msg, setMsg] = useState('')
    const { currBox } = useSelector(state => state.boxReducer)
    const currUser = useSelector(state => state.userReducer.user)
    const chatRef = useRef();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        scrollToBottom()
    }, [currBox?.chat?.length])

    useEffect(() => {
        window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
        return () => {
            window.removeEventListener('resize', () => setScreenWidth(window.innerWidth))
        }
    }, [])

    function handleInputChange(e) {
        isTyping(currBox, currUser)
        setMsg(e.target.value)
    }

    function handleSubmit(e) {
        const minUser = {
            _id: currUser._id,
            username: currUser.username,
            imgString: currUser.imgString
        }
        e.preventDefault()
        let message = {
            text: msg,
            from: minUser,
            toBoxId: currBox._id,
            createdAt: Date.now()
        }
        const data = {
            message,
            box: currBox
        }
        sendMsg(data)
        setMsg('')
    }

    function getTime(timestamp) {
        let hour = new Date(timestamp).getHours()
        let minutes = new Date(timestamp).getMinutes()
        hour = hour < 10 ? `0${hour}` : hour
        minutes = minutes < 10 ? `0${minutes}` : minutes
        return `${hour}:${minutes}`
    }

    function scrollToBottom() {
        chatRef.current.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className={screenWidth > 850 ? "chat-box flex column " : "chat-box chat-box__mobile"}>
            {screenWidth > 850 &&
                <div className="chat-header">
                    <h2>Chat Box</h2>
                </div>
            }
            {screenWidth > 850 &&
                <ul className="users-list">
                    {userList && userList.map(user => {
                        return <li key={user._id} className="user"><img src={user.imgUrl} /></li>
                    })}
                </ul>}
            <div className="chat-box__container">
                {box && box.chat?.map(msg => {
                    const { username, imgString } = msg.from
                    const isCurrUser = currUser.username === username ? true : false

                    return <div key={msg.createdAt} className={isCurrUser ? " rtl chat-box__msg flex" : "chat-box__msg flex"}>
                        <img className="chat-box__img" src={imgString} />
                        <div className="chat-box__text-container flex">
                            <span className={isCurrUser ? " currUser chat-box__username" : "chat-box__username"}>{username} </span>
                            <div className={isCurrUser ? 'user-text chat-box__txt flex' : 'chat-box__txt flex'}>
                                <div className={isCurrUser ? "txt ml" : "text mr"}>  {msg.text}</div>
                                <span className="chat-box__time"> {getTime(msg.createdAt)}</span>
                            </div>
                        </div>

                    </div>
                })}
                <div ref={chatRef}></div>
                {typingUser && <h3>{typingUser} is typing....</h3>}
                {joinedUser && joinedUser !== currUser.username && <h3>{joinedUser} joined the room</h3>}
                {newSong && <h3>{currUser.username} added new song: {newSong}</h3>}
            </div>
            <form className="text-form flex" onSubmit={(e) => handleSubmit(e)}>
                <Input type="text" onChange={(e) => handleInputChange(e)} value={msg} placeholder="Write a message" />
                {/* <button type="submit">Send</button> */}
            </form>
        </div>
    )
}

export default Chat
