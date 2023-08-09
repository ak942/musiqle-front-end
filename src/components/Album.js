import React from 'react';
import "./Album.css"
import InputForm from './InputForm';
import ScoreBoard from './ScoreBoard';
import { useState } from 'react';
import NavBar from './NavBar';


const Album = ({ playlistData, resetScore, currentScore, totalScore, streak, increaseCurrentScore, increaseStreak, resetStreak, increaseTotalScore, genreOptions, genreChanged, selectedGenre, playlistOptions, playlistChanged, selectedPlaylist }) => {

    const [attempts, setAttempts] = useState(4)
    const [num, setNum] = useState(8)
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")

    const getRandomAlbum = () => {
        const randomNum = playlistData !== undefined ? Math.floor(Math.random() * playlistData.length) : 0
        return playlistData[randomNum]
    }

    const [randomAlbum, setRandomAlbum] = useState(getRandomAlbum())
    const albumName = randomAlbum !== undefined ? setName(randomAlbum.track.album.name) : name
    const albumCover = randomAlbum !== undefined ? setUrl(randomAlbum.track.album.images[0].url) : url

    const resetGame = () => {
        setAttempts(4)
        setNum(8)
    }

    const giveAnswer = () => {
        return `The album is ${albumName}`
    }

    const skipAlbum = () => {
        resetGame()
        resetStreak()
        increaseTotalScore()
        resetScore()
        setRandomAlbum(
            getRandomAlbum()
        )
    }

    const compareInput = (inputAnswer) => {
        if (inputAnswer === albumName) {
            setRandomAlbum(
                getRandomAlbum()
            )
            increaseCurrentScore(attempts)
            increaseStreak()
            resetGame()

        } else {
            if (attempts === 0) {
                setRandomAlbum(
                    getRandomAlbum()
                )
                resetStreak()
                resetGame()
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
            <NavBar 
                genreChanged={genreChanged}
                genreOptions={genreOptions}
                selectedGenre={selectedGenre}
                playlistChanged={playlistChanged}
                playlistOptions={playlistOptions}
                selectedPlaylist={selectedPlaylist}
            />
            <h1>Guess the Album</h1>
            <ScoreBoard
                currentScore={currentScore}
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