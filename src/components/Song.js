import {useState, useEffect} from 'react'
import ScoreBoard from './ScoreBoard'
import InputForm from './InputForm'
import axios from 'axios'
import NavBar from './NavBar'

const Song = ({ currentScore, totalScore, streak, increaseScore, increaseStreak, resetStreak, increaseTotalScore }) => {
    const [attempts, setAttempts] = useState(4)
    const [songData, setSongData] = useState(null)
    // const [randomSong, setRandomSong] = useState(getRandomSong())
    const [trackId, setTrackId] = useState('256434132')
    const [lyrics, setLyrics] =useState("")
    const [trackName, setTrackName] = useState("")
    const [artist, setArtist] = useState("")



    const getRandomSong = () => {
        const randomNum = Math.floor(Math.random() * 10)
        return randomNum
    }

    useEffect(()=>{
        findTracks()
        // findLyrics()
    },[]);

    const findTracks = async() => {
        const randomTrackNum = getRandomSong()
        const response = await axios.get('https://musiqle-back-end-w9vy.onrender.com/musixmatch/track')
        setTrackName(response.data.message.body.track_list[randomTrackNum].track.track_name)
        setTrackId(response.data.message.body.track_list[randomTrackNum].track.track_id)
        // console.log(response.data.message.body.track_list[randomTrackNum].track.track_name)
        setArtist(response.data.message.body.track_list[randomTrackNum].track.artist_name)
        findLyrics(response.data.message.body.track_list[randomTrackNum].track.track_id)
    }

    const findLyrics = async(id) => {
        const response = await axios.get(`https://musiqle-back-end-w9vy.onrender.com/musixmatch/track/${id}`)
        setLyrics(response.data.message.body.lyrics.lyrics_body.split('\n'))
        console.log(response.data.message.body.lyrics.lyrics_body.split("\n"))
    }

    const giveAnswer = () => {
        return `The song is ${trackName}`
    }

    // const compareInput = (inputAnswer) => {
    //     if (inputAnswer === trackName) {

            
    //         )

    //     } else {
    //         console.log(attempts)
    //         if (attempts === 0) {
                
    //             setAttempts(4)

    //         } else {

    //             setAttempts(
    //                 attempts - 1
    //             )

    //         }
    //     }
    // }

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
            <section>{lyrics[5]}</section>
            <section>{trackName}</section>
            <InputForm
                // compareInput={compareInput}
                giveAnswer={attempts === 0 ? giveAnswer : null}
            />

        </div>
    )

}

export default Song