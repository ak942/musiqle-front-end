import { useState, useEffect } from 'react'
import ScoreBoard from './ScoreBoard'
import axios from 'axios'
import NavBar from './NavBar'
import SongInputForm from './SongInputForm'
import './Song.css'

const Song = ({ playlistData, userData, updateLongestAndCurrentStreak, updateBestOverallScore, updateCurrentScore, updateBestScoreSong, genreOptions, genreChanged, selectedGenre, playlistOptions, playlistChanged, selectedPlaylist }) => {

    const [attempts, setAttempts] = useState(4)
    const [lyrics, setLyrics] = useState("")
    const [songName, setSongName] = useState("")
    const [artistName, setArtistName] = useState("")
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
    
    
    useEffect(() => {
        findTracks()
    }, []);
    
    
    ///INITIATE NEW GAME
    const getRandomSong = () => {
        const randomNum = Math.floor(Math.random() * playlistData.length)
        return playlistData[randomNum]
    }
        
    const getRandomTrackNum = () => {
        const randomTrackNum = Math.floor(Math.random() * playlistData.length)
        return randomTrackNum
    }


    /// Get Random Track from MusixMatch
    const findTracks = async () => {
        const randomTrackNum = getRandomTrackNum()
        const response = await axios.get('https://musiqle-back-end-w9vy.onrender.com/musixmatch/track')
            setSongName(response.data.message.body.track_list[randomTrackNum].track.track_name)
            setArtistName(response.data.message.body.track_list[randomTrackNum].track.artist_name)
            findLyrics(response.data.message.body.track_list[randomTrackNum].track.track_id)
    }

    /// Get Lyrics from MusixMatch with Track ID from findTracks()
    const findLyrics = async (id) => {
        const response = await axios.get(`https://musiqle-back-end-w9vy.onrender.com/musixmatch/track/${id}`)
        // console.log(response.data.message.body.lyrics.explicit)

        // const avoidTracks= ["Takku Tamaram Bandi", "VENTE CONMIGO"]
        // const spanish = ['Ponte', 'mi', 'jacket', 'por', 'si', 'hoy', 'te', 'da', 'frío']
        setLyrics(response.data.message.body.lyrics.lyrics_body.split('\n'))
        // console.log(response.data.message.body.lyrics.lyrics_body.split("\n"))

    }

    /// Get Lyrics from MusixMatch with track name and artist from specific playlist
    const findTrackLyrics = async (song, artist) => {
        const response = await axios.get(`https://musiqle-back-end-w9vy.onrender.com/musixmatch/search_track/${song}/${artist}`)
            setLyrics(response.data.message.body.lyrics.lyrics_body.split('\n'))
    }

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
        const song = getRandomSong()
        setSongName(song.track.name)
        setArtistName(song.track.artists[0].name)
        findTrackLyrics(song.track.name,  song.track.artists[0].name)
        updateCurrentScore(score + points[attempts])
    }

    // Skip Song Callback
    const skipSong = ()=> {
        resetGame()
        setStreak(0)
        updateLongestAndCurrentStreak(0)
    }


    const handleReset = () => {
        setAttempts(4)
        const song = getRandomSong()
        setSongName(song.track.name)
        setArtistName(song.track.artists[0].name)
        findTrackLyrics(song.track.name,  song.track.artists[0].name)
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
        if (inputAnswer.toLowerCase() === correctAnswerString ) {
            alert(`You are Correct! The song is ${songName} by ${artistName}`)
            setScore(score + points[attempts])
            setTotalScore(totalScore + points[attempts])
            updateBestOverallScore(totalScore + points[attempts])
            setStreak(streak + 1)
            updateLongestAndCurrentStreak(streak + 1)
            resetGame()
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