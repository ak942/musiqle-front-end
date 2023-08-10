import { useState, useEffect } from 'react'
import ScoreBoard from './ScoreBoard'
// import InputForm from './InputForm'
import axios from 'axios'
import NavBar from './NavBar'
import SongInputForm from './SongInputForm'
import './Song.css'

const Song = ({ playlistData, userData, increaseStreak, updateTotalScore, genreOptions, genreChanged, selectedGenre, playlistOptions, playlistChanged, selectedPlaylist }) => {

    const [attempts, setAttempts] = useState(4)
    const [lyrics, setLyrics] = useState("")
    // const [songkName, setSongName] = useState("")
    // const [artistName, setArtistName] = useState("")
    const [num, setNum] = useState(0)
    const [score, setScore] = useState(0)
    // const [bestScoreSong, setBestScoreSong] = useState(userData.bestScoreSong)
    const [streak, setStreak] = useState(userData.streak)
    const [totalScore, setTotalScore] = useState(userData.totalScore)
    const filters = ["(", ")", "live", "remastered", "edit", "remix", "-", "?", "!", "remaster"]
    const points = {
        4: 10,
        3: 7,
        2: 4,
        1: 1
    }

    // useEffect(() => {
    //     findTracks()
    // }, []);

    ///INITIATE NEW GAME
    const getRandomSong = () => {
        const randomNum = Math.floor(Math.random() * playlistData.length)
        return playlistData[randomNum]
    }


    const [randomSong, setRandomSong] = useState(getRandomSong())

    // const findTracks = async () => {
    //     const randomTrackNum = getRandomSong()
    //     const response = await axios.get('https://musiqle-back-end-w9vy.onrender.com/musixmatch/track')
    //     setTrackName(response.data.message.body.track_list[randomTrackNum].track.track_name)
    //     // setTrackId(response.data.message.body.track_list[randomTrackNum].track.track_id)
    //     // console.log(response.data.message.body.track_list.length)
    //     setArtist(response.data.message.body.track_list[randomTrackNum].track.artist_name)
    //     findLyrics(response.data.message.body.track_list[randomTrackNum].track.track_id)
    // }

    const songName = randomSong.track.name;
    // console.log("Song: ", songName)
    const artistName = randomSong.track.artists[0].name
    // console.log("Artist: ", artistName)

    const findTrackLyrics = (name, artist, album) => {
        axios.get(`http://localhost:8080/musixmatch/search_track/${songName}/${artistName}`)
            .then(response => response.json())
            .then(response => {
                setLyrics(response.data.message.body.lyrics.lyrics_body.split('\n'))
            })
            .catch(err => console.log("Error, ", err))
    }

    useEffect(() => {
        findTrackLyrics(songName, artistName)
    }, [songName, artistName])


    // const findLyrics = async (id) => {
    //     const response = await axios.get(`https://musiqle-back-end-w9vy.onrender.com/musixmatch/track/${id}`)
    //     // console.log(response.data.message.body.lyrics.explicit)

    //     const avoidTracks= ["Takku Tamaram Bandi", "VENTE CONMIGO"]
    //     const spanish = ['Ponte', 'mi', 'jacket', 'por', 'si', 'hoy', 'te', 'da', 'frío']
    //     setLyrics(response.data.message.body.lyrics.lyrics_body.split('\n'))
    //     // console.log(response.data.message.body.lyrics.lyrics_body.split("\n"))

    // }
    ///GET LYRICS
    const lyricsShown = () => {
        let endNum = num + 1
        let lyricsArray = []
        let sliceLyrics = lyrics.slice(0, lyrics.length - 1)
        for (let line of sliceLyrics) {
            console.log()
            if (/[a-z]/i.test(line) && lyricsArray.indexOf(line) === -1) {
                lyricsArray.push(line)
            }
        }
        if (!lyricsArray) {
            findTrackLyrics(songName,  artistName)
        };
        let showLyrics = lyricsArray.slice(0, endNum)
        console.log({ songName }, { artistName })
        console.log(lyricsArray.slice(0, 7))
        // console.log(lyrics)
        return (
            (showLyrics || []).map(lyric => <section className="lyric">{lyric}</section>
            )
        )
    }
    /// GIVES ANSWER 
    const giveAnswer = () => {
        return `The song is ${songName} by ${artistName}`
    }

    ///Resets Game 
    const resetGame = () => {
        setAttempts(4)
        setNum(0)
        findTrackLyrics(songName,  artistName)
    }
    // Skip Song Callback
    const skipSong = () => {
        setAttempts(4)
        setNum(0)
        findTrackLyrics(songName,  artistName)
        setStreak(0)
    }

    const handleReset = () => {
        setRandomSong(
            getRandomSong()
        )
        findTrackLyrics(songName,  artistName)
    }


    //CHECK THE INPUT AGAINST ANSWER
    const compareInput = (inputAnswer) => {
        let correctAnswer = songName.toLowerCase().split(" ")
        for (let word of correctAnswer) {
            if (filters.indexOf(word) !== -1) {
                let index = correctAnswer.indexOf(word)
                correctAnswer.splice(index, 1)
            }
        }
        let correctAnswerString = correctAnswer.join(" ")
        console.log(correctAnswerString, "newcorrectanswer")
        if (inputAnswer.toLowerCase() === correctAnswerString) {
            alert(`You are Correct! The song is ${songName} by ${artistName}`)
            setTotalScore(totalScore + points[attempts])
            setScore(score + points[attempts])
            increaseStreak(streak + 1)
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
            <NavBar
                handleReset={handleReset}
                genreChanged={genreChanged}
                genreOptions={genreOptions}
                selectedGenre={selectedGenre}
                playlistChanged={playlistChanged}
                playlistOptions={playlistOptions}
                selectedPlaylist={selectedPlaylist}
            />
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
                giveAnswer={attempts === 0 ? giveAnswer : null}
                skipSong={skipSong}
            />

        </div>
    )

}

export default Song