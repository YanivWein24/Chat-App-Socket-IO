import React, { useState, useEffect } from 'react'
import queryString from 'query-string';
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar.js"
import Input from "../Input/Input.js"
import Messages from "../Messages/Messages"
import OnlineUsers from "../OnlineUsers/OnlineUsers"
import "./Chat.css"

const socket = io.connect("https://socket-io-messenger.herokuapp.com/")

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
        , [messages, users])

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
                    <OnlineUsers setShowAllUsers={setShowAllUsers} users={users} />
                    :
                    <>
                        <Messages messages={messages} name={name} />
                        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                    </>
                }
            </div>
        </div>
    )
}

export default Chat