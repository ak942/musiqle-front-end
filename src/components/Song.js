import React from 'react'
import ScoreBoard from './ScoreBoard'
import InputForm from './InputForm'
import axios from 'axios'
import NavBar from './NavBar'
import songinfo from "../dummy_data_song.json"
import { useState } from 'react'
const qs =require('qs')

const Song = ({ currentScore, totalScore, streak, increaseScore, increaseStreak, resetStreak, increaseTotalScore }) => {

    const [attempts, setAttempts] = useState(4)
    const [songData, setSongData] = useState(null)

    const getRandomSong = () => {
        const randomNum = Math.floor(Math.random() * songinfo.length)
        return songinfo[randomNum]
    }
    const [randomSong, setRandomSong] = useState(getRandomSong())

    const name = randomSong.song.name
    // const client_id= 
    // const client_secret= 
    // const auth_token = (`${client_id}:${client_secret}`, 'utf-8').toString('base64');

    // React.useEffect(() => {
    //     const getSong = async () => {
    //         try {
    //             const data = qs.stringify({'grant_type':'client_credentials'});
    //             const response = await axios.post('https://accounts.spotify.com/api/token',data,
    //                 {
    //                     headers: {
    //                         'Authorization': `Basic ${auth_token}`,
    //                         'Content-Type': 'application/x-www-form-urlencoded' 
    //                     },
                        
    //                 }
    //             )
    //             console.log(response.json())
    //             // setSongData(response.message.body.track_name)
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     getSong()
    // }, [])

    const giveAnswer = () => {
        return `The song is ${name}`
    }

    const compareInput = (inputAnswer) => {
        if (inputAnswer === name) {

            setRandomSong(
                getRandomSong()
            )

        } else {
            console.log(attempts)
            if (attempts === 0) {
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