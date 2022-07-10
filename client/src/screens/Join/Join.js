import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Join.css"

const Join = () => {

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    return (
        <div className="joinOuterContainer fade-in">
            <div className="joinInnerContainer">
                <h1 className="heading">Join <i className="fa-solid fa-arrow-right-to-bracket"></i></h1>
                {room && <p style={{ color: "white" }}>Joining Room: {room} &ensp; {name && `As: ${name}`}</p>}
                <div>
                    <input placeholder="Room" className="joinInput" type="text" onChange={(e) => setRoom(e.target.value)} />
                </div>
                <div>
                    <input placeholder="Name" className="joinInput mt-20" type="text" onChange={(e) => setName(e.target.value)} />
                </div>
                {/* if there is no value for 'name' or 'room', prevent default and stay in the same route, else continue as usual  */}
                <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className='button'>Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join