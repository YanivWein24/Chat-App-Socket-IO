import React from 'react'
import "./Input.css"

const Input = ({ message, setMessage, sendMessage }) => {
    return (
        <form className="form fade-in">
            <input
                className="input"
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <button className="sendButton" onClick={e => sendMessage(e)}>
                <i className="fa-solid fa-arrow-right" style={{ fontSize: "1.7rem" }}></i>
            </button>
        </form>
    )
}

export default Input