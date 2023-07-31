import React from 'react'
import ScoreBoard from './ScoreBoard'
import InputForm from './InputForm'
import axios from 'axios'
import NavBar from './NavBar'
import songinfo from "../dummy_data_song.json"
import { useState } from 'react'

const Song = ({ points, currentScore, totalScore, streak, increaseScore, increaseStreak, resetStreak, increaseTotalScore }) => {

    const [attempts, setAttempts] = useState(4)
    const [songData, setSongData] = useState(null)

    const getRandomSong = () => {
        const randomNum = Math.floor(Math.random() * songinfo.length)
        return songinfo[randomNum]
    }
    const [randomSong, setRandomSong] = useState(getRandomSong())

    const name = randomSong.song.name
    React.useEffect(() => {
        const getSong = async () => {
            try {
                const response = await axios.get('http://api.musixmatch.com/ws/1.1/track.search',
                    {
                        params: {
                            apikey: 'c9a60b4934a2596c302eda29d998f07f',
                            s_track_rating: "desc",
                            q_track: "lover"
                        },
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, authorization",
                            "Accept": "application/json",
            "Content-Type": "application/json"
                        },
                    }
                )
                console.log(response.json())
                setSongData(response.message.body.track_name)
            } catch (err) {
                console.log(err.message)
            }
        }
        getSong()
    }, [])

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
            <div className="size"></div>
            {songData}
            <InputForm
                compareInput={compareInput}
                giveAnswer={attempts === 0 ? giveAnswer : null}
            />

        </div>
    )

}

export default Song