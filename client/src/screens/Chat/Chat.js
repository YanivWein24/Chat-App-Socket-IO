import React, { useState, useEffect } from 'react'
import queryString from 'query-string';
import io from "socket.io-client";
import InfoBar from "../../components/InfoBar/InfoBar.js"
import Input from "../../components/Input/Input.js"
import Messages from "../../components/Messages/Messages"
import OnlineUsers from "../../components/OnlineUsers/OnlineUsers"
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

    const smallScreen = window.innerWidth < 480

    return (
        <div className="outerContainer fade-in">
            <div className="container"
                style={{
                    background: showAllUsers && "linear-gradient(rgb(47, 125, 255) 0%, rgb(131, 96, 195) 100%)",
                    height: showAllUsers && smallScreen && "100%"
                }}>
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