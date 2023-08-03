import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Album from "./components/Album";
import Song from "./components/Song";
import userinfo from "./dummy_data_user.json"
import { useState, useEffect, useCallback } from "react";
// import axios from 'axios';



const points = {
  4: 10,
  3: 7,
  2: 4,
  1: 1
}

function App() {

  // update to axios calls when back-end deployed
  const [score, setScore] = useState(userinfo[0].score)
  const [totalScore, setTotalScore] = useState(userinfo[0].totalScore)
  const [streak, setStreak] = useState(userinfo[0].streak)
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState("BQCo2b6my_0TeDWD5sUr5Cy3HvldJn_6sqLjSUAd0hQ5FvOOkpGXRSAyzO0hmIrzCeCo69Oupk_jd_5Yi_gmXup5s-oHWL_xvG_YKeAxJPyTgbVo1aM")
  const [playlistID, setPlaylistID] = useState("1ap9564Wpqxi2Bb8gVaSWc")
  const [playlistData, setPlaylistData] = useState([])

  const client_id = process.env.REACT_APP_CLIENT_ID
  const client_secret = process.env.REACT_APP_CLIENT_SECRET

  const getAccessToken = async () => {
    // API Access token
    await fetch("https://accounts.spotify.com/api/token", {
      method: 'POST',
      headers: {
        Authorization: 'Basic MGMyMzM2YTBkMDZhNGE4M2ExMGE1N2UzMDY2MDg0NWM6OTA5ZWM5ODYwNDc5NDlmYjgwYWJlY2IzMzFlM2I4Nzg=',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
    })
      .then(result => result.json())
      // .then(response => console.log(response))
      .then(response => setAccessToken(response.access_token))
      .catch(err => console.log("Error! ", err))

  }

  // Only gets access token once every hour
  useEffect(() => {
    const interval = setInterval(() => {
      setAccessToken(getAccessToken());
    }, 3500 * 1000);
    return () => clearInterval(interval);
  })

  const getPlaylist = useCallback(async () => {
    // console.log("This is my access token: ", accessToken)
    let userParameters = {
      // method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }

    await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, userParameters)
      .then(async (response) => {
        const { items } = await response.json()
        // console.log("My response: ", items)
        setPlaylistData(items)
      })
      // .then(response => setPlaylistData(response.items))
      .catch(err => console.log("An error has occurred.", err))

    // console.log("Tracks info: ", tracks)
    // return tracks
  }, [accessToken])


  useEffect(() => {
    getPlaylist()
  }, [getPlaylist])

  console.log(playlistData)

  const findUser = (newuser) => {
    setUser(newuser)
  }

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
              user={user}
              findUser={findUser}
            />
          }
        />
        <Route
          path="/album"
          element={
            <Album
              playlistData={playlistData}
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
