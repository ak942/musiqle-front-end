import React from 'react';
import "./Album.css"
import InputForm from './InputForm';
import ScoreBoard from './ScoreBoard';
import albuminfo from "../dummy_data_album.json"
import { useState } from 'react';
import NavBar from './NavBar';


const Album = ({ currentScore, totalScore, streak, inputAnswer, setInputAnswer }) => {

    // Get info from input form
    // while (attempts > 0) {
    //     if (answer !== name) {
    //         attempts--
    //     }
    // }

    const [attempts, setAttempts] = useState(4)
    const [num, setNum] = useState(8)

    const getRandomAlbum = () => {
        const randomNum = Math.floor(Math.random() * albuminfo.length)
        return albuminfo[randomNum]
    }

    const [randomAlbum, setRandomAlbum] = useState(getRandomAlbum())

    const name = randomAlbum.album.name
    const url = randomAlbum.album.images[0].url


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
            <img className={`blur${num} size image`} src={url} alt="album cover" />
            <InputForm
                name={name}
                attempts={attempts}
                setAttempts={setAttempts}
                num={num}
                setNum={setNum}
                inputAnswer={inputAnswer}
                setInputAnswer={setInputAnswer}
                setRandomAlbum={setRandomAlbum}
            />
        </div>
    )
}

export default Album;