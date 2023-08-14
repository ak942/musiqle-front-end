import React from 'react'
import "./ScorePage.css"

const ScorePage = ({ userName, userScore }) => {
    return (
        <div className="wide">
            <span className="left-align">
                Player: {userName}, 
            </span>
            <span className="right-align">
                Best Score: {userScore}
            </span>
        </div>
    )
}

export default ScorePage