import React from 'react';
import "./Album.css"
import InputForm from './InputForm';
import ScoreBoard from './ScoreBoard';
import { useState } from 'react';
import NavBar from './NavBar';


const Album = ({ playlistData, userData, increaseStreak }) => {
    const [streak, setStreak] = useState(userData.streak)
    const [totalScore, setTotalScore] = useState(userData.totalScore)
    const [score, setScore] =useState(0)
    const [attempts, setAttempts] = useState(4)
    const [num, setNum] = useState(8)
    const points = {
        4: 10,
        3: 7,
        2: 4,
        1: 1
    }
    const getRandomAlbum = () => {
        const randomNum = Math.floor(Math.random() * playlistData.length)
        return playlistData[randomNum]
    }

    const [randomAlbum, setRandomAlbum] = useState(getRandomAlbum())

    const resetGame = () => {
        setAttempts(4)
        setNum(8)
        increaseStreak(streak + 1)
    }

    const name = randomAlbum.track.album.name
    console.log(name)
    const url = randomAlbum.track.album.images[0].url

    const giveAnswer = () => {
        return `The album is ${name}`
    }

    const skipAlbum = () => {
        resetGame()
        setStreak(0)
        setScore(0)
        setRandomAlbum(
            getRandomAlbum()
        )
    }

    const compareInput = (inputAnswer) => {
        if (inputAnswer === name) {
            setRandomAlbum(
                getRandomAlbum()
            )
            setTotalScore(totalScore + points[attempts])
            setScore(score + points[attempts])
            setStreak(streak + 1)
            resetGame()

        } else {
            if (attempts === 0) {
                setRandomAlbum(
                    getRandomAlbum()
                )
                setStreak(0)
                resetGame()

            } else {

                setAttempts(
                    attempts - 1
                )
                setNum(
                    num - 2
                )
            }
        }
    }


    return (
        <div className="center game">
            <NavBar />
            <h1>Guess the Album</h1>
            <ScoreBoard
                currentScore={score}
                totalScore={totalScore}
                streak={streak}
            />
            <p>Attempts Left: {attempts}</p>
            <img
                className={`blur${num} size image`}
                src={url}
                alt="album cover"
            />
            <InputForm
                skipAlbum={skipAlbum}
                giveAnswer={attempts === 0 ? giveAnswer : null}
                compareInput={compareInput}
            />
        </div>
    )
}

export default Album;