import React from 'react'
import "./ScoreBoard.css"

const ScoreBoard = ({ currentScore = 0, totalScore = 0, streak = 0 }) => {
    return (
        <div className="scores">
            <div className="score-bubble">Score: {currentScore}</div>
            <div className="score-bubble">Total: {totalScore}</div>
            <div className="score-bubble">Streak: {streak}</div>
        </div>
    )
}

export default ScoreBoard