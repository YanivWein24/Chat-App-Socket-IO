import React, { useState, useEffect } from 'react'
import queryString from 'query-string';
import io from "socket.io-client";
import "./Chat.css"
import "../InfoBar/InfoBar.css"
import InfoBar from "../InfoBar/InfoBar.js"

const socket = io.connect("http://localhost:5000")

const Chat = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

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
    }, [messages])

    const sendMessage = (e) => {
        e.preventDefault()
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    console.log("messages:", messages)

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />

                {/* <input value={message} onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage(e)} /> */}
            </div>
        </div>
    )
}

export default Chat