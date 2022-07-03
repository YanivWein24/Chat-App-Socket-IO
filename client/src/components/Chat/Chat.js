import React, { useState, useEffect } from 'react'
import queryString from 'query-string';
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar.js"
import Input from "../Input/Input.js"
import Messages from "../Messages/Messages"
import "./Chat.css"

const socket = io.connect("http://localhost:5000")

const Chat = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState('');
    const [showAllUsers, setShowAllUsers] = useState(false)

    useEffect(() => {
        const urlQueries = window.location.search // returns the queries from the url: ?name=...&room=...
        const { name, room } = queryString.parse(urlQueries) // returns an object that contain the queries: {name: "...", room: "..."}

        setName(name)
        setRoom(room)
        socket.emit('join', { name, room }, () => { }) // es6 syntax for "name: name, room: room "

        // return () => {
        //     socket.disconnect()
        //     socket.off() // remove the socket instance
        // }
    }, [socket, window.location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
        socket.on("usersInRoom", ({ users }) => {
            setUsers(users);
        })
    }
        , [messages])

    const sendMessage = (e) => {
        e.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    console.log("messages:", messages)

    return (
        <div className="outerContainer fade-in">
            <div className="container">
                <InfoBar room={room} showAllUsers={showAllUsers} setShowAllUsers={setShowAllUsers} />
                {showAllUsers ?
                    <h2 className="allUsers fade-in">
                        <button className="returnButton" onClick={() => setShowAllUsers(false)}>
                            <i class="fa-solid fa-arrow-right-long"></i>
                        </button>
                        <h2 className="allUsersHeader fade-in">Currently Connected Users:</h2>
                        {users.map(({ name }) => (
                            <div key={name} className="activeItem">
                                <div className="onlineUser">
                                    <i className="onlineIcon fa-solid fa-circle" style={{ fontSize: ".6rem" }}></i>
                                    {name}
                                </div>
                            </div>
                        ))}
                    </h2>
                    :
                    // <div className="fade-in">
                    <>
                        <Messages messages={messages} name={name} />
                        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                        {/* </div> */}
                    </>
                }
            </div>
        </div>
    )
}

export default Chat