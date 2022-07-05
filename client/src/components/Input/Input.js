import React from 'react'
import "./Input.css"

const Input = ({ message, setMessage, sendMessage }) => {
    const eraseTextArea = () => {
        document.getElementById("text").value = ""
    }

    const longMessage = message.length > 35

    return (
        <form className="form fade-in">
            <textArea
                className="text"
                id="text"
                placeholder="Type a message..."
                rows={longMessage ? 2 : 1}
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && (sendMessage(e), eraseTextArea())}
            />
            <button className="sendButton" onClick={e => (sendMessage(e), eraseTextArea())}>
                <i className="fa-solid fa-arrow-right" style={{ fontSize: "1.7rem" }}></i>
            </button>
        </form>
    )
}

export default Input