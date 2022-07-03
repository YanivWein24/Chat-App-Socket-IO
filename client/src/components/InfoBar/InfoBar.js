import React from 'react'
import "./InfoBar.css"

const InfoBar = ({ room, showAllUsers, setShowAllUsers }) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <i className="onlineIcon fa-solid fa-circle" alt="online icon"></i>
                <h3>Room: {room}</h3>
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