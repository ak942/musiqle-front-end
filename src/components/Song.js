import { useState, useEffect } from 'react'
import ScoreBoard from './ScoreBoard'
import InputForm from './InputForm'
// import axios from 'axios'
import NavBar from './NavBar'
import SongInputForm from './SongInputForm'
import './Song.css'

const Song = ({ currentScore, totalScore, streak, increaseScore, increaseStreak, resetStreak, increaseTotalScore }) => {
    const [attempts, setAttempts] = useState(4)
    // const [songData, setSongData] = useState(null)
    const [trackId, setTrackId] = useState('256434132')
    const [lyrics, setLyrics] = useState("")
    const [trackName, setTrackName] = useState("")
    const [artist, setArtist] = useState("")
    const [num, setNum] = useState(0)


    useEffect(() => {
        findTracks()
    }, []);

    ///INITIATE NEW GAME
    const getRandomSong = () => {
        const randomNum = Math.floor(Math.random() * 10)
        return randomNum
    }

    const findTracks = async () => {
        const randomTrackNum = getRandomSong()
        const response = await axios.get('https://musiqle-back-end-w9vy.onrender.com/musixmatch/track')
        setTrackName(response.data.message.body.track_list[randomTrackNum].track.track_name)
        setTrackId(response.data.message.body.track_list[randomTrackNum].track.track_id)
        // console.log(response.data.message.body.track_list[randomTrackNum].track.track_name)
        setArtist(response.data.message.body.track_list[randomTrackNum].track.artist_name)
        findLyrics(response.data.message.body.track_list[randomTrackNum].track.track_id)
    }

    const findLyrics = async (id) => {
        const response = await axios.get(`https://musiqle-back-end-w9vy.onrender.com/musixmatch/track/${id}`)
        setLyrics(response.data.message.body.lyrics.lyrics_body.split('\n'))
        // console.log(response.data.message.body.lyrics.lyrics_body.split("\n"))
    }
    ///GET LYRICS
    const lyricsShown = () => {
        console.log(num, "num")
        let endNum = num + 1 + 5
        let sliceLyrics = lyrics.slice(5, endNum)
        // console.log(lyrics)
        return (
            (sliceLyrics || []).map(lyric => <section className="lyric">{lyric}</section>
            )
        )
    }
    /// GIVES ANSWER 
    const giveAnswer = () => {
        return `The song is ${trackName} by ${artist}`
    }

    //CHECK THE INPUT AGAINST ANSWER
    const compareInput = (inputAnswer) => {
        if (inputAnswer === trackName) {
            //reset the game
        } else {
            console.log(attempts)
            if (attempts === 0) {
                setAttempts(4)
                setNum(0)
                findTracks()
            } else {
                setAttempts(attempts - 1)
                setNum(num + 1)
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
            <div className="size">{lyricsShown()}</div>
            
            <section>{giveAnswer()}</section>
            {/* <InputForm
                // compareInput={compareInput}
                giveAnswer={attempts === 0 ? giveAnswer : null}
            /> */}
            <SongInputForm compareInput={compareInput} />

        </div>
    )

}

export default Song