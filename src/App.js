import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Album from "./components/Album";
import Song from "./components/Song";
import userinfo from "./dummy_data_user.json"
import { useState, useEffect } from "react";
import CLIENT_ID from './.env'
import CLIENT_SECRET from './.env'
import axios from 'axios';



const points = {
  4: 10,
  3: 7,
  2: 4,
  1: 1
}

function App() {

  // update to axios calls when back-end deployed
  const [score, setScore] = useState(userinfo[0].user.score)
  const [totalScore, setTotalScore] = useState(userinfo[0].user.totalScore)
  const [streak, setStreak] = useState(userinfo[0].user.streak)
  const [accessToken, setAccessToken] = useState("")
  // const [playlistID, setPlaylistID] = useState("6Mdybhdl4DYWG1i5stZzfq")
  const [playlistData, setPlaylistData] = useState([])


  const playlistID = "6Mdybhdl4DYWG1i5stZzfq"

  
  const getAccessToken = async () => {  
    // API Access token
    const response = 
      await fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + {CLIENT_SECRET}
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
      })
      .then(result => result.json())
      .then(response => console.log(response))
      .catch(err => console.log("Error! ", err))

      console.log(response)



    // var authParameters = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    // }
    // fetch('https://accounts.spotify.com/api/token', authParameters)
    // .then(result => result.json())
    // .then(data => console.log(data.access_token))
    // .then(data => setAccessToken(data.access_token))
    // .catch(err => console.log("An error has occurred.", err))

  }
  
  // Only gets access token once every hour
  useEffect(()=> {
    const interval = setInterval(() => {
      getAccessToken();
    }, 10*1000);
      return () => clearInterval(interval);
  }, [])
  
  const getPlaylist = () => {
    let userParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    console.log("This is my access token: ", accessToken)
    let tracks = () => {
      axios.get(`http://api.spotify.com/v1/playlist/${playlistID}/tracks`, userParameters)
        .then(response => response.json())
        .then(data => setPlaylistData(data.items))
        .catch(err => console.log("An error has occurred.", err))
    }
    console.log("Tracks info: ", tracks)
    return tracks
  }

  const findUser = (newuser)=> {
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
            <Home user={user} findUser = {findUser}/>
          }
        />
        <Route
          path="/album"
          element={
            <Album
              getPlaylist={getPlaylist}
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
