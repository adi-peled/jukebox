import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'


import './Chat.scss'
function Chat({ box, sendMsg, isTyping, typingUser, joinedUser, newSong }) {
    const [msg, setMsg] = useState('')
    const { currBox } = useSelector(state => state.boxReducer)
    const currUser = useSelector(state => state.userReducer.user)
    const chatRef = useRef();

    useEffect(() => {
        scrollToBottom()
    }, [currBox?.chat?.length])


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
            currBox
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
        <div className="chat-box flex column ">
            <div className="chat-box__container">
                {box && box.chat?.map(msg => {
                    const { username, imgString } = msg.from
                    const isCurrUser = currUser.username === username ? true : false
                    return <div className={isCurrUser ? 'currUser chat-box__msg  flex' : 'chat-box__msg  flex'} key={msg.createdAt}>
                        <div className="chat-box__sender flex">
                            {!isCurrUser && <img className="chat-box__img" src={imgString} />}
                            {isCurrUser && <span className="chat-box__username">you </span>}
                            {!isCurrUser && <span className="chat-box__username">{username} </span>}
                            <span className="chat-box__time"> {getTime(msg.createdAt)}</span>
                        </div>
                        <div className={isCurrUser ? 'user-text chat-box__txt' : 'chat-box__txt'}>
                            {msg.text}
                        </div>

                    </div>

                })}
                <div ref={chatRef}></div>
                {typingUser && <h3>{typingUser} is typing....</h3>}
                {joinedUser && joinedUser !== currUser.username && <h3>{joinedUser} joined the room</h3>}
                {newSong && <h3>{currUser.username} added new song: {newSong}</h3>}
            </div>
            <form className="text-form" onSubmit={(e) => handleSubmit(e)}>
                <input type="text" onChange={(e) => handleInputChange(e)} value={msg} placeholder="Write a message" />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Chat
