import React from 'react'
import "./Message.css"
import ReactEmoji from 'react-emoji'

const date = new Date()

const Message = ({ message: { text, user }, name }) => {
    // inside server.js we call 'sendMessage' and emit a new message containing the user and the text.
    // now we destruct this object to receive both of the values.  
    let sentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase()
    // convert the given name the exact same way we did when we added the user ('addUser' method in 'users.js')
    if (user === trimmedName) {
        sentByCurrentUser = true;
    }

    const userIsAdmin = user === "Admin"

    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const time = `${date.getHours()}:${minutes}`
    return (
        sentByCurrentUser
            ? (
                <div className="swing-in-top-fwd">
                    <div className="messageContainer justifyEnd ">
                        <div className="messageBox backgroundBlue">
                            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                        </div>
                    </div>
                    <p className="sentText pr-10">You {time}</p>
                </div>
            )
            : (
                <div className="slide-in-left">
                    <div className="messageContainer justifyStart">
                        <div className="messageBox backgroundLight" style={{ backgroundColor: userIsAdmin && "#cdd9ec" }}>
                            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                        </div>
                    </div>
                    <p className="sentText pl-10 ">{user} {time}</p>
                </div>
            )
    )
}

export default Message