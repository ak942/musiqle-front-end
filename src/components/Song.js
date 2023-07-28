import React from 'react'
import ScoreBoard from './ScoreBoard'
import InputForm from './InputForm'
import axios from 'axios'

const Song = ({name, currentScore, totalScore, streak, attempts = 4}) => {
    const [songData, setSongData] = React.useState(null)
    const accessToken = "BQAMUyDSZPDYTTl_Zt-FE4dpDeSpjcSR7oKzgMWV8H9O1uEacdH4ni0yvd_0-RJWUTW4jIAhArPlWsoB1wAzcGaKCx6HQTz3nes-8uZJdqvfmUG4nrY"; //Replace with your Access Token obtained from Spotify API


    React.useEffect(() => {
    const loadPage = async () => {
        try {
            const response = await axios.get('https://api.spotify.com/v1/search?q=sweet%20child%20o%20mine%20artist:guns%20n%20roses&type=track&limit=1',
            {
                headers: {
                Authorization: `Bearer ${accessToken}`,
                },
            }
            )
            setSongData(response.data.tracks.items[0]);
        } catch (err) {
            console.log(err.message)
        }
    }
    loadPage()
    }, [])

    const music = () => { return songData ? (
            <div>
            <h1>{songData.name}</h1>
            <p>{songData.artists[0].name}</p>
            <img src={songData.album.images[0].url} alt="Album Cover" />
            </div>
        ) : (
            <p>Loading...</p>
        )}
    return (
        <div className="center game">
            <h1>Guess the Song</h1>
            <ScoreBoard currentScore={currentScore} totalScore={totalScore} streak={streak} />
            <p>Attempts Left: {attempts}</p>
            <div className="size"></div>
            {music()}
            <InputForm />
        </div>
    )

}

export default Song