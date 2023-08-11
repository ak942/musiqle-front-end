import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Album from "./components/Album";
import Song from "./components/Song";
import { useState, useEffect } from "react";
import axios from 'axios';
import SignInpPopUp from "./components/SignInpPopUp";


function App() {
  // const [accessToken, setAccessToken] = useState(null)
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState({})
  const [userId, setUserId] = useState(null)
  const [allData, setAllData] = useState([])
  const [genres, setGenres] = useState({ selectedGenre: '', listOfGenresFromAPI: [] })
  const [playlist, setPlaylist] = useState({ selectedPlaylist: '1ap9564Wpqxi2Bb8gVaSWc', listOfPlaylistFromAPI: [] })
  const [showSignIn, setShowSignIn] = useState(false)
  const [playlistData, setPlaylistData] = useState([])
  
  // Retrieves tracks from ADA C19 Playlist as default selected playlist
  useEffect(() => {
    // const playlistID = "1ap9564Wpqxi2Bb8gVaSWc"
    try {
      axios.get(`https://musiqle-back-end-w9vy.onrender.com/playlists/${playlist.selectedPlaylist}`)
      .then(tracksResponse => {
        console.log(tracksResponse)
        setPlaylistData(tracksResponse.data.items)
      })
      .catch(err => console.log("Error! ", err))
    } catch {
      console.log("Could not retrieve tracks.")
    }
  }, [playlist.selectedPlaylist])

  /// Getting all the Users from DB
  useEffect(() => {
    axios.get('https://musiqle-back-end-w9vy.onrender.com/user')
    .then((response) => {
      setAllData(response.data)
      console.log(response.data)
    })
    .catch(err=>console.log("Error! ", err))
  }, []);

  /// Adding User to DB
  const addNewUser = (newUserData) => {
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
      specificUserChosen = newUserData
      addNewUser(newUserData)
    }
    setUser(specificUserChosen.name)
    setUserId(specificUserChosen.id)
    setUserData(specificUserChosen)
    console.log(specificUserChosen, "new")
  }

  /// Sign Out User
  const userSignOut = () => {
    setUser(null)
    setUserData({})
  }

  ///Delete User
  const deleteUser = () => {
    axios.delete(`https://musiqle-back-end-w9vy.onrender.com/user/${userData.id}`)
    userSignOut()
  };
  
  // Retrieves list of genres from Spotify API
  useEffect(() => {
    try {
      axios.get("https://musiqle-back-end-w9vy.onrender.com/genres")
          .then(genreResponse => {
              setGenres({
                  selectedGenre: genres.selectedGenre,
                  listOfGenresFromAPI: genreResponse.data.categories.items
              })
          })
    } catch {
      console.log("Could not retrieve genres.")
    } try {
      axios.get(`https://musiqle-back-end-w9vy.onrender.com/playlists/${playlist.selectedPlaylist}`)
        .then(tracksResponse => {
          console.log(tracksResponse)
          setPlaylistData(tracksResponse.data.items)
        })
        .catch(err => console.log("Error! ", err))
    } catch {
      console.log("Could not retrieve tracks.")
    }
  }, [])

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
          .catch(err=>console.log("Error! ", err))
  }

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
          .catch(err=>console.log("Error! ", err))
  }


  //// Updates Longest Streak and Streak API Call to DD
  const updateLongestAndCurrentStreak=(streak) => {
    const currentLongestStreak = userData.longestStreak
    const currentStreak = userData.streak
    if (streak > currentLongestStreak) {
      try {axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userId}/longeststreak`,
      {"longestStreak": streak})
    } catch {
      console.log("Longest Streak could not be updated")
    }} else if (streak > currentStreak) {
      try {axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userId}/streak`,
      {"streak": streak})
    } catch {
      console.log("Longest Streak could not be updated")
  }}}

  /// Update Current Score API Call to DB
  const updateCurrentScore = (score) => {
    try {
      axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userData.id}/score`, 
      {"score": score}) 
      if (userData.bestOverallScore < score) {
        axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userData.id}/bestoverallscore`, 
        {"bestOverallScore": score})
      }
    } catch {
      console.log("Score could not be updated.")
    }}

  ///Update Total Score Call API Patch to DB
  const updateBestOverallScore = (totalscore) => {
    try { axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userId}/totalscore`,
    {"totalScore": totalscore})
  } catch {
    console.log("Total score could not be updated")
  }}

  ///Update BestScore Song API Patch Call to DB
  const updateBestScoreSong = (score) => {
    const bestDBScoreSong = userData.bestScoreSong
    if (bestDBScoreSong > score) {
    try { axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userId}/totalscore`,
    {"totalScore": score})
  } catch {
    console.log("Total score could not be updated")
  }}}

  ///Update BestScore Song API Patch Call to DB
  const updateBestScoreAlbum = (score) => {
    const bestDBScoreAlbum = userData.bestScoreAlbum
    if (bestDBScoreAlbum > score) {
    try { axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userId}/totalscore`,
    {"totalScore": score})
  } catch {
    console.log("Total score could not be updated")
  }}}

  return (
    <Router>
      <Routes>
        <Route
          exact path="/"
          element={
            <Home
              user={user}
              userData = {userData}
              findUser={getUserData}
              deleteUser = {deleteUser}
              userSignOut = {userSignOut}
            />
          }
        />
        <Route
          path="/album"
          element={<Album
              playlistData={playlistData}
              userData = {userData}
              updateCurrentScore={updateCurrentScore}
              updateLongestAndCurrentStreak={updateLongestAndCurrentStreak}
              updateBestScoreSong={updateBestScoreSong}
              updateBestOverallScore={updateBestOverallScore}
              genreChanged={genreChanged}
              genreOptions={genres.listOfGenresFromAPI}
              selectedGenre={genres.selectedGenre}
              playlistChanged={playlistChanged}
              playlistOptions={playlist.listOfPlaylistFromAPI}
              selectedPlaylist={playlist.selectedPlaylist}
            />}
        />
        <Route
          path="/song"
          element={<Song
            playlistData = {playlistData}
            userData = {userData}
            updateLongestAndCurrentStreak={updateLongestAndCurrentStreak}
            updateBestOverallScore={updateBestOverallScore}
            updateCurrentScore = {updateCurrentScore}
            genreChanged={genreChanged}
            genreOptions={genres.listOfGenresFromAPI}
            selectedGenre={genres.selectedGenre}
            playlistChanged={playlistChanged}
            playlistOptions={playlist.listOfPlaylistFromAPI}
            selectedPlaylist={playlist.selectedPlaylist}
          />}
        />
      </Routes>
    </Router>
  );
}

export default App;
