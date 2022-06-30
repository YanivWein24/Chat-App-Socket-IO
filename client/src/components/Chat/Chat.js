import React, { useState, useEffect } from 'react'
import queryString from 'query-string';
import io from "socket.io-client";
import "./Chat.css"

// const socket = io.connect();
const socket = io.connect("http://localhost:5000")
console.log(socket)

const Chat = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    useEffect(() => {
        const urlQueries = window.location.search // returns the queries from the url: ?name=...&room=...
        const { name, room } = queryString.parse(urlQueries) // returns an object that contain the queries: {name: "...", room: "..."}

        setName(name)
        setRoom(room)
        socket.emit('join', { name, room }, () => { }) // es6 syntax for "name: name, room: room "

        return () => {
            socket.disconnect()
            socket.off() // remove the socket instance
        }
    }, [socket, window.location.search])

    return (
        <div>
            <h1>Chat</h1>
        </div>
    )
}

export default Chat