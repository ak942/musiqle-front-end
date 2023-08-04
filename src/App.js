import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Album from "./components/Album";
import Song from "./components/Song";
import userinfo from "./dummy_data_user.json"
import { useState, useEffect, useCallback } from "react";
import axios from 'axios';

const points = {
  4: 10,
  3: 7,
  2: 4,
  1: 1
}

function App() {

  // update to axios calls when back-end deployed
  const [score, setScore] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState({})
  const [accessToken, setAccessToken] = useState(null)
  // const [playlistID, setPlaylistID] = useState("1ap9564Wpqxi2Bb8gVaSWc")
  const [playlistData, setPlaylistData] = useState([])
  const [allData, setAllData] = useState([])
  const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromAPI: []})
  const [playlist, setPlaylist] = useState({selectedPlaylist: '', listOfPlaylistFromAPI: []})

  const encoded = process.env.REACT_APP_ENCODED

  // One time call to get Spotify Access Token
  useEffect(() => {
    // API Access token
    axios("https://accounts.spotify.com/api/token", {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encoded}=`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: 'grant_type=client_credentials'
    })
      .then(response => {
        console.log("Access token: ", response.data.access_token)
        setAccessToken(response.data.access_token);

        axios('https://api.spotify.com/v1/browse/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${response.data.access_token}`
          }
        })
        .then(genreResponse => {
          setGenres({
            selectedGenre: genres.selectedGenre,
            listOfGenresFromAPI: genreResponse.data.categories.items
          })
        })
      })
      .catch(err => console.log("Error! ", err))
  }, [genres.selectedGenre, encoded]);

  const genreChanged = val => {
    setGenres({
      selectedGenre: val,
      listOfGenresFromAPI: genres.listOfGenresFromAPI
    })

    axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(playlistResponse => {
      setPlaylist({
        selectedPlaylist: playlist.selectedPlaylist,
        listOfPlaylistFromAPI: playlistResponse.data.playlists.items
      })
    })
  }

  const playlistChanged = val => {
    setPlaylist({
      selectedPlaylist: val,
      listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
    })
    axios(`https://api.spotify.com/v1/playlists/${val}/tracks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then((response) => {
      // const { items } = response.json()
      console.log("My response: ", response)
      setPlaylistData(response.data.items)
    })
    .catch(err => console.log("An error has occurred.", err))
  }


  // const getPlaylist = useCallback(async () => {
  //   let userParameters = {
  //     // method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${accessToken}`
  //     }
  //   }

  //   await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, userParameters)
  //     .then(async (response) => {
  //       const { items } = await response.json()
  //       // console.log("My response: ", items)
  //       setPlaylistData(items)
  //     })
  //     .catch(err => console.log("An error has occurred.", err))
  // }, [accessToken])

  //Getting all the Users from DB
  useEffect(() => {
    axios.get('https://musiqle-back-end-w9vy.onrender.com/user').then((response) => {
      setAllData(response.data)
      console.log(response.data)
    })
  }, []);

  //choosing the right user
  const getUserData = (newuser) => {
    const specificUser = allData.find(user => {
      return user.name === newuser
    })
    const newUserData = {
      "name": newuser,
      "score": 0,
      "streak": 0,
      "totalScore": 0,
      "longestStreak": 0,
      "bestOverallScore": 0,
      "bestScoreAlbum": 0,
      "bestScoreSong": 0
    }
    const specificUserChosen = specificUser ? specificUser : newUserData //postnewuser
    setUser(specificUserChosen.name)
    setUserData(specificUserChosen)
    console.log(specificUserChosen, "new")
    console.log(userData, "userdata")
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
              findUser={getUserData}
              genreChanged={genreChanged}
              genreOptions={genres.listOfGenresFromAPI}
              selectedGenre={genres.selectedGenre}
              playlistChanged={playlistChanged}
              playlistOptions={playlist.listOfPlaylistFromAPI}
              selectedPlaylist={playlist.selectedPlaylist}
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
