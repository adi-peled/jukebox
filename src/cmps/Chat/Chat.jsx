import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Chat.scss'
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
        setMsg(e.target.value)
    }

    function handleSubmit (e){
        e.preventDefault()
        let message = {
            text: msg,
            from: currUser,
            toBoxId: currBox._id,
            createdAt: new Date() 
        }
        const data = {
            message,
            currBox
        }
        sendMsg(data)
        setMsg('')
    }
    return (
        <div className="chat-box flex column space-between">
            <div>
                {chat && chat.map(msg => {
                    return <p key={msg.createdAt}>{msg.text}</p>
                })}
            </div>
            <form className="text-form" onSubmit={(e)=>handleSubmit(e)}>
                <input type="text" onChange={(e)=>handleInputChange(e)} value={msg} placeholder="Write a message"/>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Chat
