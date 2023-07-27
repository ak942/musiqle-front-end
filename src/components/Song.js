import React from 'react'
import InputForm from './InputForm'
import ScoreBoard from './ScoreBoard'

const song = ({ name, currentScore, totalScore, streak, attempts = 4 }) => {
    return (
        <div className="center game">
            <h1>Guess the Song</h1>
            <ScoreBoard currentScore={currentScore} totalScore={totalScore} streak={streak} />
            <p>Attempts Left: {attempts}</p>
            <div className="size"></div>
            <InputForm />
        </div>
    )
}

export default song