import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Album from "./components/Album";
import Song from "./components/Song";
import userinfo from "./dummy_data_user.json"
import { useState, useEffect } from "react";
import axios from 'axios';



const points = {
  4: 10,
  3: 7,
  2: 4,
  1: 1
}

const CLIENT_ID = "0c2336a0d06a4a83a10a57e30660845c"
const CLIENT_SECRET = "909ec986047949fb80abecb331e3b878"

function App() {

  // update to axios calls when back-end deployed
  const [score, setScore] = useState(userinfo[0].user.score)
  const [totalScore, setTotalScore] = useState(userinfo[0].user.totalScore)
  const [streak, setStreak] = useState(userinfo[0].user.streak)
  const [accessToken, setAccessToken] = useState("")
  // const [playlistID, setPlaylistID] = useState("6Mdybhdl4DYWG1i5stZzfq")


  useEffect(() => {
    // API Access token
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
      .catch(err => console.log("An error has occurred.", err))
  }, [])

  // const getPlaylistTracks = () => {
  //   let userParameters = {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + accessToken
  //     }
  //   }
  //   let tracks = () => {
  //     fetch("http://api.spotify.com/v1/playlist/" + playlistID + '/tracks', userParameters)
  //       .then(response => response.json())
  //       .then(data => { return data.items.track.album.name })
  //       .catch(err => console.log("An error has occurred.", err))
  //   }
  //   console.log(tracks)
  //   return tracks
  // }

  const increaseCurrentScore = (attemptsLeft) => {
    setScore(score + points[attemptsLeft])
  }

  const increaseStreak = () => {
    setStreak(streak + 1)
  }

  const increaseTotalScore = () => {
    setTotalScore(totalScore + score)
  }

  const resetScore = () => {
    setScore(0)
  }

  const resetStreak = () => {
    setStreak(0)
  }

  return (
    <Router>
      <Routes>
        <Route
          exact path="/"
          element={
            <Home

            />
          }
        />
        <Route
          path="/album"
          element={
            <Album
              // getPlaylistTracks={getPlaylistTracks}
              currentScore={score}
              totalScore={totalScore}
              streak={streak}
              increaseCurrentScore={increaseCurrentScore}
              resetScore={resetScore}
              increaseStreak={increaseStreak}
              resetStreak={resetStreak}
              increaseTotalScore={increaseTotalScore}
            />
          }
        />
        <Route
          path="/song"
          element={
            <Song
              currentScore={score}
              totalScore={totalScore}
              streak={streak}
              increaseCurrentScore={increaseCurrentScore}
              resetScore={resetScore}
              increaseStreak={increaseStreak}
              resetStreak={resetStreak}
              increaseTotalScore={increaseTotalScore}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
