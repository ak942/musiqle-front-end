import { useState, useEffect } from 'react'
import ScoreBoard from './ScoreBoard'
import InputForm from './InputForm'
import axios from 'axios'
import NavBar from './NavBar'
import SongInputForm from './SongInputForm'
import './Song.css'

const Song = ({ userData,currentScore, totalScore, streak, increaseScore, increaseStreak, resetStreak, increaseTotalScore }) => {
    const [attempts, setAttempts] = useState(4)
    // const [songData, setSongData] = useState(null)
    // const [trackId, setTrackId] = useState('256434132')
    const [lyrics, setLyrics] = useState("")
    const [trackName, setTrackName] = useState("")
    const [artist, setArtist] = useState("")
    const [num, setNum] = useState(0)
    const filters = ["(", ")", "live", "remastered", "edit", "remix", "-", "?", "!", "remaster"]


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
        // if (response.data.message.body.lyrics.explicit ===1) {
        //     await findTracks()
        // }  else {
        setLyrics(response.data.message.body.lyrics.lyrics_body.split('\n'))
        // console.log(response.data.message.body.lyrics.lyrics_body.split("\n"))
        
    }
    ///GET LYRICS
    const lyricsShown = () => {
        let endNum = num + 1 + 3
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
        let showLyrics = lyricsArray.slice(3,endNum)
        console.log({trackName}, {artist})
        console.log(lyricsArray.slice(3,10))
        console.log(lyrics)
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
        let correctAnswer = trackName.toLowerCase().split(" ")
        for (let word of correctAnswer){
            if(filters.indexOf(word) !== -1 || /[a-z]/i.test(word) === false) {
                let index = correctAnswer.indexOf(word)
                correctAnswer.splice(index,1)
            }
        }
        let correctAnswerString = correctAnswer.join(" ")
        console.log(correctAnswerString, "newcorrectanswer")
        if (inputAnswer.toLowerCase() === correctAnswerString ) {
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
                currentScore={userData.currentScore}
                totalScore={userData.totalScore}
                streak={userData.streak}
            />
            <p>Attempts Left: {attempts}</p>
            <div className="size">{lyricsShown()}</div>
            
            {/* <section>{giveAnswer()}</section> */}
            {/* <InputForm
                // compareInput={compareInput}
                giveAnswer={attempts === 0 ? giveAnswer : null}
            /> */}
            <SongInputForm compareInput={compareInput} />

        </div>
    )

}

export default Song