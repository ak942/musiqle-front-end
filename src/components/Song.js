import React from 'react'
import InputForm from './InputForm'
import ScoreBoard from './ScoreBoard'

const song = ({ name, currentScore, totalScore, streak, attempts = 4 }) => {
    const play = () => {
        new Audio('https://open.spotify.com/track/1dGr1c8CrMLDpV6mPbImSI').play()
    }
    return (
        <div className="center game">
            <h1>Guess the Song</h1>
            <ScoreBoard currentScore={currentScore} totalScore={totalScore} streak={streak} />
            <p>Attempts Left: {attempts}</p>
            <div className="size"></div>
            <button onClick={play}>Play Sound</button>
            <InputForm />
        </div>
    )
}

export default song