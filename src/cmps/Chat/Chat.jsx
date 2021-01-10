import React from 'react'
import './Chat.scss'
function Chat({box}) {
    function handleSubmit (e){
        e.preventDefault()
    }
    return (
        <div className="chat-box flex column space-between">
            <div>
                {box && box.chat.map(msg => {
                    return <p key={msg._id}>{msg.text}</p>
                })}
            </div>
            <form className="text-form" onSubmit={(e)=>handleSubmit(e)}>
                <input type="text" placeholder="Write a message"/>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Chat
