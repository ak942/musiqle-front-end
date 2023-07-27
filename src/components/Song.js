import React from 'react'
import InputForm from './InputForm'
import ScoreBoard from './ScoreBoard'

const song = ({ name, currentScore, totalScore, streak, attempts = 4, inputAnswer, setInputAnswer }) => {
    return (
        <div className="center game">
            <h1>Guess the Song</h1>
            <ScoreBoard
                currentScore={currentScore}
                totalScore={totalScore}
                streak={streak}
            />
            <p>Attempts Left: {attempts}</p>
            <div className="size">
                test
            </div>
            <InputForm
                songName={name}
                inputAnswer={inputAnswer}
                setInputAnswer={setInputAnswer}
            />
        </div>
    )
}

export default song