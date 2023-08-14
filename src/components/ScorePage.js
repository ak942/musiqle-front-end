import React from 'react'
import "./ScorePage.css"

const ScorePage = ({ statType, userName, userScore }) => {
    return (
        <div className="wide">
            <span className="left-align">
                Player: {userName} 
            </span>
            <span className="right-align">
                {statType}: {userScore}
            </span>
        </div>
    )
}

export default ScorePage