import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Album from "./components/Album";
import Song from "./components/Song";
import { useState, useEffect } from "react";
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
  const [allData, setAllData] = useState([])
  
  
  
  useEffect(() => {
    try {
      axios.delete('https://musiqle-back-end-w9vy.onrender.com/access_token')
      axios.post('https://musiqle-back-end-w9vy.onrender.com/access_token')
      .then(response => response.json())
      .then(response => {
        setAccessToken(response.access_token)
      })
    } catch {
      console.log("Could not retrieve access token.")
    }
  })
  

  const [playlistData, setPlaylistData] = useState([])
  
  // Retrieves tracks from ADA C19 Playlist as default selected playlist
  useEffect(() => {
    const playlistID = "1ap9564Wpqxi2Bb8gVaSWc"
    axios.get(`https://musiqle-back-end-w9vy.onrender.com/playlists/${playlistID}`)
    .then(tracksResponse => {
      setPlaylistData(tracksResponse.data.items)
    })
  }, [])

  const [genres, setGenres] = useState({ selectedGenre: '', listOfGenresFromAPI: [] })
  
  // Retrieves list of genres from Spotify API
  useEffect(() => {
      axios.get("https://musiqle-back-end-w9vy.onrender.com/genres")
          .then(genreResponse => {
              setGenres({
                  selectedGenre: genres.selectedGenre,
                  listOfGenresFromAPI: genreResponse.data.categories.items
              })
          })
  }, [genres.selectedGenre])

  // Retrieves list of playlists from selected genre
  const genreChanged = val => {
      setGenres({
          selectedGenre: val,
          listOfGenresFromAPI: genres.listOfGenresFromAPI
      })

      axios.get(`https://musiqle-back-end-w9vy.onrender.com/genres/${val}/playlists`)
          .then(playlistResponse => {
              setPlaylist({
                  selectedPlaylist: playlist.selectedPlaylist,
                  listOfPlaylistFromAPI: playlistResponse.data.playlists.items
              })
          })
  }

  const [playlist, setPlaylist] = useState({ selectedPlaylist: '', listOfPlaylistFromAPI: [] })

  // Retrieves list of tracks from selected playlist
  const playlistChanged = val => {
      setPlaylist({
          selectedPlaylist: val,
          listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
      })

      axios.get(`https://musiqle-back-end-w9vy.onrender.com/playlists/${val}`)
          .then(tracksResponse => {
              setPlaylistData(tracksResponse.data.items)
          })
  }


  /// Getting all the Users from DB
  useEffect(() => {
    axios.get('https://musiqle-back-end-w9vy.onrender.com/user').then((response) => {
      setAllData(response.data)
      // console.log(response.data)
    })
  }, []);

  /// Adding User to DB
  const addNewUser = (newUserData) => {
    console.log("addnewuser")
    axios.post('https://musiqle-back-end-w9vy.onrender.com/user', newUserData)
  }

  /// choosing the right user
  const getUserData = (newuser) => {
    const specificUser = allData.find(user => {
      return user.name.toLowerCase() === newuser.toLowerCase()
    })
    const newUserData = {
      "name": newuser.toLowerCase(),
      "score": 0,
      "streak": 0,
      "totalScore": 0,
      "longestStreak": 0,
      "bestOverallScore": 0,
      "bestScoreAlbum": 0,
      "bestScoreSong": 0
    }
    let specificUserChosen;
    if (specificUser) {
      specificUserChosen = specificUser
    } else {
      console.log("else")
      specificUserChosen = newUserData
      addNewUser(newUserData)
    }
    // const specificUserChosen = specificUser ? specificUser : newUserData //postnewuser
    setUser(specificUserChosen.name)
    setUserData(specificUserChosen)
    console.log(specificUserChosen, "new")
    console.log(userData, "userdata")
  }
  /// Sign Out User
  const userSignOut = () => {
    setUser(null)
    setUserData({})
  }
  ///Delete User
  const deleteUser = () => {
    const id = userData.id
    console.log(id)
    axios.delete(`https://musiqle-back-end-w9vy.onrender.com/user/${id}`)
    userSignOut()
  };

  //// NEED TO BE UPDATED TO REFLECT CHANGES IN DB FOR USER, CURRENTLY NOT GETTING SAVED AND RESETTING ON REFRESH
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

  const loggedIn = (user !== null) ? true : false
  

  return (
    <Router>
      <Routes>
        <Route
          exact path="/"
          element={
            <Home
              user={user}
              findUser={getUserData}
              deleteUser = {deleteUser}
              userSignOut = {userSignOut}
              // genreChanged={genreChanged}
              // genreOptions={genres.listOfGenresFromAPI}
              // selectedGenre={genres.selectedGenre}
              // playlistChanged={playlistChanged}
              // playlistOptions={playlist.listOfPlaylistFromAPI}
              // selectedPlaylist={playlist.selectedPlaylist}
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
              userData = {userData}
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
