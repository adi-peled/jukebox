import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Chat.scss'
function Chat({ box, sendMsg, isTyping }) {
    const [msg, setMsg] = useState('')
    const { currBox } = useSelector(state => state.boxReducer)
    const currUser = useSelector(state => state.userReducer.user)


    useEffect(() => {
        console.log(box);

    }, [])

    function handleInputChange(e) {
        isTyping(currBox, currUser)
        setMsg(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        let message = {
            text: msg,
            from: currUser,
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


    return (
        <div className="chat-box flex column space-between">
            <div className="chat-box__container">
                {box && box.chat.map(msg => {
                    const { username, imgString } = msg.from
                    const isCurrUser = currUser.username === username ? true : false
                    return <div className={isCurrUser? 'currUser chat-box__msg  flex' :'chat-box__msg  flex'} key={msg.createdAt}>
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
            </div>
            <form className="text-form" onSubmit={(e) => handleSubmit(e)}>
                <input type="text" onChange={(e) => handleInputChange(e)} value={msg} placeholder="Write a message" />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Chat
