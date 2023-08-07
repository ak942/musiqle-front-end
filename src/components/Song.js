import { useState, useEffect } from 'react'
import ScoreBoard from './ScoreBoard'
import InputForm from './InputForm'
import axios from 'axios'
import NavBar from './NavBar'
import SongInputForm from './SongInputForm'
import './Song.css'

const Song = ({ currentScore, totalScore, streak, increaseScore, increaseStreak, resetStreak, increaseTotalScore }) => {
    const [attempts, setAttempts] = useState(4)
    // const [songData, setSongData] = useState(null)
    // const [trackId, setTrackId] = useState('256434132')
    const [lyrics, setLyrics] = useState("")
    const [trackName, setTrackName] = useState("")
    const [artist, setArtist] = useState("")
    const [num, setNum] = useState(0)


    useEffect(() => {
        findTracks()
    }, []);

    ///INITIATE NEW GAME
    const getRandomSong = () => {
        const randomNum = Math.floor(Math.random() * 100)
        return randomNum
    }

    const findTracks = async () => {
        const randomTrackNum = getRandomSong()
        const response = await axios.get('https://musiqle-back-end-w9vy.onrender.com/musixmatch/track')
        setTrackName(response.data.message.body.track_list[randomTrackNum].track.track_name)
        // setTrackId(response.data.message.body.track_list[randomTrackNum].track.track_id)
        console.log(response.data.message.body.track_list.length)
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
        let endNum = num + 1 + 5
        let lyricsArray = []
        let sliceLyrics = lyrics.slice(0,lyrics.length)
        for (let line of sliceLyrics) {
            // console.log(line)
            if (/[a-z]/i.test(line)){
                lyricsArray.push(line)
            } 
        }
        if (! lyricsArray) {
            findTracks()
        };
        let showLyrics = lyricsArray.slice(5,endNum)
        console.log(lyricsArray.slice(5,11))
        return (
            (showLyrics || []).map(lyric => <section className="lyric">{lyric}</section>
            )
        )
    }
    /// GIVES ANSWER 
    const giveAnswer = () => {
        return `The song is ${trackName} by ${artist}`
    }

    ///Resets Game
    const resetGame = () => {
        setAttempts(4)
        setNum(0)
        findTracks()
    }

    //CHECK THE INPUT AGAINST ANSWER
    const compareInput = (inputAnswer) => {
        if (inputAnswer.toLowerCase() === trackName.toLowerCase()) {
            alert(`You are Correct! The song is ${trackName} by ${artist}`)
            resetGame()
            return
        } else {
            if (attempts === 0) {
                resetGame()
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