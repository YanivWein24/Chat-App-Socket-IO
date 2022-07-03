import React from 'react'
import "./InfoBar.css"

const InfoBar = ({ room }) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <i className="onlineIcon fa-solid fa-circle" alt="online icon"></i>
                <h3>Room: {room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><i className="fa-solid fa-circle-xmark exitButton"></i></a>
            </div>
        </div>
    )
}

export default InfoBar