import React from 'react';
import "./Album.css"
import InputForm from './InputForm';
import ScoreBoard from './ScoreBoard';
import albuminfo from "../dummy_data_album.json"
import { useState } from 'react';
import NavBar from './NavBar';


const Album = ({ currentScore, totalScore, streak }) => {

    const [attempts, setAttempts] = useState(4)
    const [num, setNum] = useState(8)

    const getRandomAlbum = () => {
        const randomNum = Math.floor(Math.random() * albuminfo.length)
        return albuminfo[randomNum]
    }

    const [randomAlbum, setRandomAlbum] = useState(getRandomAlbum())

    const name = randomAlbum.album.name
    const url = randomAlbum.album.images[0].url

    const giveAnswer = () => {
        return `The album is ${name}`
    }

    const compareInput = (inputAnswer) => {
        if (inputAnswer === name) {

            console.log(name)
            setRandomAlbum(
                getRandomAlbum()
            )

        } else {
            console.log(attempts)
            if (attempts === 0) {

                console.log("Game Over")
                setRandomAlbum(
                    getRandomAlbum()
                )
                setAttempts(4)
                setNum(8)

            } else {

                setAttempts(
                    attempts - 1
                )
                setNum(
                    num - 2
                )

            }

            console.log(attempts)


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
                giveAnswer={attempts === 0 ? giveAnswer : null}
                compareInput={compareInput}
            />
        </div>
    )
}

export default Album;