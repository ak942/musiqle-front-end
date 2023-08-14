import React from 'react';
import "./Artist.css"
import ArtistInputForm from './ArtistInputForm';
import ScoreBoard from './ScoreBoard';
import { useState } from 'react';
import NavBar from './NavBar';


const Artist = ({ playlistData, userData, updateLongestAndCurrentStreak, updateBestOverallScore, updateCurrentScore, genreOptions, genreChanged, selectedGenre, playlistOptions, playlistChanged, selectedPlaylist }) => {


    const [streak, setStreak] = useState(userData.streak)
    const [totalScore, setTotalScore] = useState(userData.totalScore)
    const [score, setScore] = useState(0)
    const [attempts, setAttempts] = useState(4)
    const [num, setNum] = useState(8)

    const points = {
        4: 10,
        3: 7,
        2: 4,
        1: 1
    }

    const filters = ["(", ")", "live", "remastered", "edit", "remix", "-", "?", "!", "remaster", "deluxe"]

    const getRandomAlbum = () => {
        const randomNum = playlistData ? Math.floor(Math.random() * playlistData.length) : 0
        return playlistData[randomNum]
    }

    const [randomAlbum, setRandomAlbum] = useState(getRandomAlbum())

    const artistName = randomAlbum.track.album.artists[0].name
    const albumCover = randomAlbum.track.album.images[0].url

    // Sets score in state and User's DB stats to 0
    const resetScore = () => {
        setScore(0)
        updateCurrentScore(0)
    }

    // Sets streak in state and User's DB stats to 0
    const resetStreak = () => {
        setStreak(0)
        updateLongestAndCurrentStreak(0)
    }

    // Increases score in state and User's DB stats to new score
    const increaseScore = () => {
        setScore(score + points[attempts])
        updateCurrentScore(userData.score + points[attempts])
    }

    // Increases streak in state and User's DB stats to new streak
    const increaseStreak = () => {
        updateLongestAndCurrentStreak(streak + 1)
        setStreak(streak + 1)
    }

    // Increases total score in state and User's DB stats to new total score
    const increaseTotalScore = () => {
        setTotalScore(totalScore + points[attempts])
        updateBestOverallScore(userData.totalScore + points[attempts])
    }


    // Resets game after correct guess
    const resetGame = () => {
        setAttempts(4)
        setNum(8)
        setRandomAlbum(
            getRandomAlbum()
        )
    }


    const giveAnswer = () => {
        return `The artist is ${artistName}.`
    }

    // Click when user wants to skip song, but lose points
    const skipAlbum = () => {
        resetGame()
        resetScore()
        resetStreak()
    }

    // Click when playlist has been changed
    const handleReset = () => {
        setRandomAlbum(
            getRandomAlbum()
        )
    }

    const compareInput = (inputAnswer) => {
        let correctAnswer = artistName.toLowerCase().split(" ")
        for (let word of correctAnswer) {
            if (filters.indexOf(word) !== -1) {
                let index = correctAnswer.indexOf(word)
                correctAnswer.splice(index, 1)
            }
        }
        let correctAnswerString = correctAnswer.join(" ")
        if (inputAnswer.toLowerCase() === correctAnswerString) {
            alert(`You are Correct! The artist is ${artistName}.`)
            increaseTotalScore()
            increaseScore()
            increaseStreak()
            resetGame()

        } else {

            if (attempts === 0) {
                resetScore()
                resetStreak()
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
            <h1>Guess the Artist</h1>
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
            <ArtistInputForm
                skipAlbum={skipAlbum}
                giveAnswer={attempts === 0 ? giveAnswer : null}
                compareInput={compareInput}
            />
        </div>
    )
}

export default Artist;