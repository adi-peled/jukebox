import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Chat.scss'
<<<<<<< HEAD
function Chat({ box, sendMsg, isTyping }) {
    const [msg, setMsg] = useState('')
    const { currBox } = useSelector(state => state.boxReducer)
    const currUser = useSelector(state => state.userReducer.user)

    function handleInputChange(e) {
        isTyping(currBox, currUser)
=======
function Chat({box,sendMsg, isTyping}) {
    const [chat,setChat]=useState(box.chat)
    const [msg, setMsg] = useState('')
    const { currBox }= useSelector(state => state.boxReducer)
    const  currUser = useSelector(state => state.userReducer.user)
    
    useEffect(() => {
        
        setChat(box.chat)
        
    }, [ box?.chat?.length])


    function handleInputChange(e){
        isTyping(currBox,currUser)
>>>>>>> ee1e4df0dc16d1fd8e73edc3264dc1e35c20d835
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
        hour= hour<10? `0${hour}` : hour
        minutes= minutes<10? `0${minutes}` : minutes
        return `${hour}:${minutes}`
    }



    return (
        <div className="chat-box flex column space-between">
<<<<<<< HEAD
            <div className="chat-box__container">
                {box && box.chat.map(msg => {
                    const { username, imgString } = msg.from
                    const msgClass = currUser.username === username ? 'currUser ' : ''
                    return <div className={msgClass + 'chat-box__msg  flex'} key={msg.createdAt}>
                        <div className="chat-box__sender flex">
                            {!msgClass && <img className="chat-box__img" src={imgString} />}
                           {msgClass&& <span className="chat-box__username">you </span>}
                           {!msgClass&& <span className="chat-box__username">{username} </span>}
                            <span className="chat-box__username"> {getTime(msg.createdAt)}</span>
                        </div>
                        <div className="chat-box__txt">   {msg.text}</div>

                    </div>
=======
            <div>
                {chat && chat.map(msg => {
                    return <p key={msg.createdAt}>{msg.text}</p>
>>>>>>> ee1e4df0dc16d1fd8e73edc3264dc1e35c20d835
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
