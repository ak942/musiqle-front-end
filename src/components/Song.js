import { useState, useEffect } from 'react'
import ScoreBoard from './ScoreBoard'
import axios from 'axios'
import NavBar from './NavBar'
import SongInputForm from './SongInputForm'
import './Song.css'

const Song = ({ refreshData, showRules, playlistData, userData, updateData, updateBestScoreSong, genreOptions, genreChanged, selectedGenre, playlistOptions, playlistChanged, selectedPlaylist }) => {

    const [attempts, setAttempts] = useState(4)
    const [lyrics, setLyrics] = useState("")
    const [songName, setSongName] = useState("")
    const [artistName, setArtistName] = useState("")
    const [num, setNum] = useState(0)
    const [score, setScore] = useState(userData.score)
    // const [bestScoreSong, setBestScoreSong] = useState(userData.bestScoreSong)
    const [streak, setStreak] = useState(userData.streak)
    const [totalScore, setTotalScore] = useState(userData.totalScore)
    const [correctAnswerString, setCorrectAnswerString]=useState("")
    
    
    const filters = ["live","ep","version", "edit", "remix",  "remastered", "yuh"]   
    
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
        const randomTrackNum = Math.floor(Math.random() * 100)
        return randomTrackNum
    }


    /// Get Random Track from MusixMatch
    const findTracks = async () => {
        const randomTrackNum = getRandomTrackNum()
        const response = await axios.get('https://musiqle-back-end-w9vy.onrender.com/musixmatch/track')
            setSongName(response.data.message.body.track_list[randomTrackNum].track.track_name)
            cleanAnswer(response.data.message.body.track_list[randomTrackNum].track.track_name)
            setArtistName(response.data.message.body.track_list[randomTrackNum].track.artist_name)
            findLyrics(response.data.message.body.track_list[randomTrackNum].track.track_id)
    }

    /// Get Lyrics from MusixMatch with Track ID from findTracks()
    const findLyrics = async (id) => {
        const response = await axios.get(`https://musiqle-back-end-w9vy.onrender.com/musixmatch/track/${id}`)
        // const avoidTracks= ["Takku Tamaram Bandi", "VENTE CONMIGO"]
        // const spanish = ['Ponte', 'mi', 'jacket', 'por', 'si', 'hoy', 'te', 'da', 'frío']
        setLyrics(response.data.message.body.lyrics.lyrics_body.split('\n'))
        // console.log(response.data.message.body.lyrics.lyrics_body.split("\n"))

    }

    /// Get Lyrics from MusixMatch with track name and artist from specific playlist
    const findTrackLyrics = async () => {
        const song = await getRandomSong()
        setSongName(song.track.name)
        setArtistName(song.track.artists[0].name)
        cleanAnswer(song.track.name)
        const response = await axios.get(`https://musiqle-back-end-w9vy.onrender.com/musixmatch/search_track/${song.track.name}/${song.track.artists[0].name}`)
            setLyrics(response.data.message.body.lyrics.lyrics_body.split('\n'))
    }


    ///GET LYRICS
    const lyricsShown = () => {
        let endNum = num + 1
        let lyricsArray = []
        const commercialUse = ["******* This Lyrics is NOT for Commercial use *******"]
        let sliceLyrics = lyrics.slice(0, lyrics.length - 1)
        for (let line of sliceLyrics) {
            if (/[a-z]/i.test(line) && lyricsArray.indexOf(line) === -1 && commercialUse.indexOf(line) === -1) {
                lyricsArray.push(line)
            }
        }
        if (!lyricsArray) {
            findTrackLyrics()
        };
        let showLyrics = lyricsArray.slice(0, endNum)
        // console.log({ songName }, { artistName })
        return (
            (showLyrics || []).map(lyric => <section key={lyric} className="lyric">{lyric}</section>
            )
        )
    }
    /// GIVES ANSWER 
    const giveAnswer = () => {
        return `The song is ${songName} by ${artistName}`
    }

    const lives = (attempts) => {
        if (attempts === 4) {
            return "💚  💚  💚  💚 "
        } else if (attempts === 3) {
            return "💚  💚  💚  🤍"
        } else if (attempts === 2) {
            return "💚  💚  🤍  🤍"
        } else if (attempts === 1) {
            return "💚  🤍  🤍  🤍"
        } else if (attempts === 0) {
            return "🤍  🤍  🤍  🤍"
        }
    }
    ///increase Best Score in User's DB Stats
    const increaseDBSongScore = () => {
        updateBestScoreSong(userData.bestScoreSong + points[attempts])
    }

    ///Resets Game 
    const resetGame = () => {
        setNum(0)
        setAttempts(4)
        findTrackLyrics()
    }

    // Skip Song Callback
    const skipSong = ()=> {
        updateData(0, 0,totalScore)
        resetGame()
        setScore(0)
        setStreak(0)
    }

    //Handle Reset
    const handleReset = () => {
        setAttempts(4)
        setNum(0)
        findTrackLyrics()
    }


    ///Create Clean Answer for SongName
    const cleanAnswer = (songName)=> {
        let correctAnswer = songName.replace(/[^0-9a-zA-Z.']/g," ").toLowerCase().split(' ')
        const filteredAnswer = correctAnswer.filter(word => !filters.some(f => word ===f))
        setCorrectAnswerString(filteredAnswer.join(" "))
    }

    //CHECK THE INPUT AGAINST ANSWER
    const compareInput = (inputAnswer) => {
        // console.log(correctAnswerString, "Correct Answer");
        if (inputAnswer.toLowerCase() === correctAnswerString ) {
            alert(`You are Correct! The song is ${songName} by ${artistName}`)
            setScore(score + points[attempts])
            updateData(streak + 1, score + points[attempts],totalScore + points[attempts])
            setStreak(streak + 1)
            setTotalScore(totalScore + points[attempts])
            resetGame()
            increaseDBSongScore()
        } else {
            if (attempts === 0) {
                updateData(0, 0,totalScore)
                resetGame()
                setScore(0)
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
                refreshData={refreshData}
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
            <p className="lives">{lives(attempts)}</p>
            <div className="song-size">{lyricsShown()}</div>
            <div className="inline">
                <div>
                    {showRules()}
                </div>
                <SongInputForm
                    compareInput={compareInput}
                    giveAnswer={attempts === 0 ? giveAnswer : null}
                    skipSong={skipSong}
                />
            </div>
        </div>
    )

}

export default Song