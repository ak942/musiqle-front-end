import React from 'react';
import "./Album.css"
import InputForm from './InputForm';
import ScoreBoard from './ScoreBoard';
// import albuminfo from "../dummy_data_album.json"
import { useState } from 'react';
import NavBar from './NavBar';


const Album = ({ playlistData, resetScore, currentScore, totalScore, streak, increaseCurrentScore, increaseStreak, resetStreak, increaseTotalScore }) => {

    const playlist = playlistData
    console.log("These are my songs: ", playlist)
    const [attempts, setAttempts] = useState(4)
    const [num, setNum] = useState(8)

    const getRandomAlbum = () => {
        const randomNum = Math.floor(Math.random() * playlist.length)
        console.log(playlist[randomNum])
        return playlist[randomNum]
    }

    const [randomAlbum, setRandomAlbum] = useState(getRandomAlbum())

    const resetScoreBoard = () => {
        setAttempts(4)
        setNum(8)
    }

    const name = randomAlbum.track.album.name
    const url = randomAlbum.track.album.images[0].url

    const giveAnswer = () => {
        return `The album is ${name}`
    }

    const skipAlbum = () => {
        resetScoreBoard()
        resetStreak()
        increaseTotalScore()
        resetScore()
        setRandomAlbum(
            getRandomAlbum()
        )
    }

    const compareInput = (inputAnswer) => {
        if (inputAnswer === name) {
            setRandomAlbum(
                getRandomAlbum()
            )
            increaseCurrentScore(attempts)
            increaseStreak()
            resetScoreBoard()

        } else {
            if (attempts === 0) {
                setRandomAlbum(
                    getRandomAlbum()
                )
                resetStreak()
                resetScoreBoard()
                increaseTotalScore()
                resetScore()

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
                currentScore={currentScore}
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