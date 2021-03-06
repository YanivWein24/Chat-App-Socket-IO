import React from 'react'
import "./InfoBar.css"

const InfoBar = ({ room, users, showAllUsers, setShowAllUsers }) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <i className="fa-solid fa-comment-dots roomIcon"></i>

                <h3>Room: {room}</h3>
                <i className="onlineIcon fa-solid fa-circle ml-10" alt="online icon"></i>
                <h3 className="">Online: {users.length}</h3>
            </div>
            <div className="rightInnerContainer">
                {showAllUsers === false &&
                    <button className="showUsers" onClick={() => setShowAllUsers(!showAllUsers)}>
                        <i className="fa-solid fa-user-group" />
                    </button>
                }
                <a href="/"><i className="fa-solid fa-circle-xmark exitButton" ></i></a>
            </div>
        </div>
    )
}

export default InfoBar