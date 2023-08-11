import React from 'react';
import "./Album.css"
import InputForm from './InputForm';
import ScoreBoard from './ScoreBoard';
import { useState } from 'react';
import NavBar from './NavBar';


const Album = ({ playlistData, userData, increaseStreak, genreOptions, genreChanged, selectedGenre, playlistOptions, playlistChanged, selectedPlaylist }) => {
    
    
    const [streak, setStreak] = useState(userData.streak)
    const [totalScore, setTotalScore] = useState(userData.totalScore)
    const [score, setScore] = useState(0)
    const [attempts, setAttempts] = useState(4)
    const [num, setNum] = useState(8)
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")
    const points = {
        4: 10,
        3: 7,
        2: 4,
        1: 1
    }
    
    const getRandomAlbum = () => {
        const randomNum = playlistData ? Math.floor(Math.random() * playlistData.length) : 0
        return playlistData[randomNum]
    }
    
    const [randomAlbum, setRandomAlbum] = useState(getRandomAlbum())

    const albumName = randomAlbum ? randomAlbum.track.album.name : name
    const albumCover = randomAlbum ? randomAlbum.track.album.images[0].url : url

    // Resets game after correct guess
    const resetGame = () => {
        setAttempts(4)
        setNum(8)
        increaseStreak(streak + 1)
        setRandomAlbum(
            getRandomAlbum()
        )
    }


    const giveAnswer = () => {
        return `The album is ${albumName}`
    }

    // Click when user wants to skip song, but lose points
    const skipAlbum = () => {
        resetGame()
        setStreak(0)
        setScore(0)
    }

    // Click when playlist has been changed
    const handleReset = () => {
        setRandomAlbum(
            getRandomAlbum()
        )
    }

    const compareInput = (inputAnswer) => {
        let correctAnswer = albumName.toLowerCase()
        if (inputAnswer.toLowerCase() === correctAnswer) {
            alert(`You are Correct! The album is ${albumName}.`)
            setTotalScore(totalScore + points[attempts])
            setScore(score + points[attempts])
            setStreak(streak + 1)
            resetGame()

        } else {
            if (attempts === 0) {
                setStreak(0)
                resetGame()

            } else {

                setAttempts(attempts - 1)
                setNum(num - 2)
            }
        }
    }


    return (
        <div className="center game">
            <NavBar
                handleReset={handleReset}
                genreChanged={genreChanged}
                genreOptions={genreOptions}
                selectedGenre={selectedGenre}
                playlistChanged={playlistChanged}
                playlistOptions={playlistOptions}
                selectedPlaylist={selectedPlaylist}
            />
            <h1>Guess the Album</h1>
            <ScoreBoard
                currentScore={score}
                totalScore={totalScore}
                streak={streak}
            />
            <p>Attempts Left: {attempts}</p>
            <img
                className={`blur${num} size image`}
                src={albumCover}
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