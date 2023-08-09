import { useState, useEffect } from 'react'
import ScoreBoard from './ScoreBoard'
import InputForm from './InputForm'
import axios from 'axios'
import NavBar from './NavBar'
import SongInputForm from './SongInputForm'
import './Song.css'

const Song = ({ userData, increaseStreak, increaseTotalScore}) => {
    const [attempts, setAttempts] = useState(4)
    const [lyrics, setLyrics] = useState("")
    const [trackName, setTrackName] = useState("")
    const [artist, setArtist] = useState("")
    const [num, setNum] = useState(0)
    const [score, setScore] = useState(0)
    const [bestScoreSong, setBestScoreSong] = useState(userData.bestScoreSong)
    const [streak, setStreak] = useState(userData.streak)
    const [totalScore, setTotalScore] = useState(userData.totalScore)
    const filters = ["(", ")", "live", "remastered", "edit", "remix", "-", "?", "!", "remaster"]
    const points = {
        4: 10,
        3: 7,
        2: 4,
        1: 1
    }

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
        // console.log(response.data.message.body.track_list.length)
        setArtist(response.data.message.body.track_list[randomTrackNum].track.artist_name)
        findLyrics(response.data.message.body.track_list[randomTrackNum].track.track_id)
    }

    const findLyrics = async (id) => {
        const response = await axios.get(`https://musiqle-back-end-w9vy.onrender.com/musixmatch/track/${id}`)
        // console.log(response.data.message.body.lyrics.explicit)

        const avoidTracks= ["Takku Tamaram Bandi", "VENTE CONMIGO"]
        const spanish = ['Ponte', 'mi', 'jacket', 'por', 'si', 'hoy', 'te', 'da', 'frío']
        setLyrics(response.data.message.body.lyrics.lyrics_body.split('\n'))
        // console.log(response.data.message.body.lyrics.lyrics_body.split("\n"))
        
    }
    ///GET LYRICS
    const lyricsShown = () => {
        let endNum = num + 1
        let lyricsArray = []
        let sliceLyrics = lyrics.slice(0,lyrics.length-1)
        for (let line of sliceLyrics) {
            console.log()
            if (/[a-z]/i.test(line) && lyricsArray.indexOf(line) === -1){
                lyricsArray.push(line) 
            } 
        }
        if (! lyricsArray) {
            findTracks()
        };
        let showLyrics = lyricsArray.slice(0,endNum)
        console.log({trackName}, {artist})
        console.log(lyricsArray.slice(0,7))
        // console.log(lyrics)
        return (
            (showLyrics || []).map(lyric => <section className="lyric">{lyric}</section>
            )
        )
    }
    /// GIVES ANSWER 
    const giveAnswer = () => {
        return `The song is ${trackName} by ${artist}`
    }

    ///Resets Game + Skip Song Callback
    const resetGame = () => {
        setAttempts(4)
        setNum(0)
        increaseStreak(streak +1)
        findTracks()
    }


    //CHECK THE INPUT AGAINST ANSWER
    const compareInput = (inputAnswer) => {
        let correctAnswer = trackName.toLowerCase().split(" ")
        for (let word of correctAnswer){
            if(filters.indexOf(word) !== -1) {
                let index = correctAnswer.indexOf(word)
                correctAnswer.splice(index,1)
            }
        }
        let correctAnswerString = correctAnswer.join(" ")
        console.log(correctAnswerString, "newcorrectanswer")
        if (inputAnswer.toLowerCase() === correctAnswerString ) {
            alert(`You are Correct! The song is ${trackName} by ${artist}`)
            setTotalScore(totalScore + points[attempts])
            setScore(score + points[attempts])
            setStreak(streak + 1)
            resetGame()
            return
        } else {
            if (attempts === 0) {
                resetGame()
                setStreak(0)
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
                currentScore={score}
                totalScore={totalScore}
                streak={streak}
            />
            <p>Attempts Left: {attempts}</p>
            <div className="size">{lyricsShown()}</div>
            <SongInputForm 
            compareInput={compareInput} 
            giveAnswer = {attempts ===0? giveAnswer: null}
            skipSong = {resetGame}
            />

        </div>
    )

}

export default Song