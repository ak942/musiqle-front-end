import React from 'react'
import "./ScorePage.css"

const ScorePage = ({ statType, userName, userScore }) => {
    const capitalizedUserName = userName.toUpperCase()

    return (
        <div className="wide flex">
            <span className="left-align">
                {capitalizedUserName}
            </span>
            <span className="right-align">
                {statType}: {userScore}
            </span>
        </div>
    )
}

export default ScorePage