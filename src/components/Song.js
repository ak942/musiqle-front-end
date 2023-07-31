import React from 'react'
import InputForm from './InputForm'
import ScoreBoard from './ScoreBoard'
import NavBar from './NavBar'
import songinfo from "../dummy_data_song.json"
import { useState } from 'react'

const Song = ({ points, currentScore, totalScore, streak, increaseScore, increaseStreak, resetStreak, increaseTotalScore }) => {

    const [attempts, setAttempts] = useState(4)

    const getRandomSong = () => {
        const randomNum = Math.floor(Math.random() * songinfo.length)
        return songinfo[randomNum]
    }

    const [randomSong, setRandomSong] = useState(getRandomSong())

    const name = randomSong.song.name

    const giveAnswer = () => {
        return `The song is ${name}`
    }

    const compareInput = (inputAnswer) => {
        if (inputAnswer === name) {

            console.log(name)
            setRandomSong(
                getRandomSong()
            )

        } else {
            console.log(attempts)
            if (attempts === 0) {

                console.log("Game Over")
                setRandomSong(
                    getRandomSong()
                )
                setAttempts(4)

            } else {

                setAttempts(
                    attempts - 1
                )

            }
        }
    }

    return (
        <div className="center game">
            <NavBar />
            <h1>Guess the Song</h1>
            <ScoreBoard
                currentScore={currentScore}
                totalScore={totalScore}
                streak={streak}
            />
            <p>Attempts Left: {attempts}</p>
            <div className="size">
                {name}
            </div>
            <InputForm
                compareInput={compareInput}
                giveAnswer={attempts === 0 ? giveAnswer : null}
            />

        </div>
    )
}

export default Song