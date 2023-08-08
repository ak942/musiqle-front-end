import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Album from "./components/Album";
import Song from "./components/Song";
import { useState, useEffect } from "react";
import axios from 'axios';
import SignInpPopUp from "./components/SignInpPopUp";

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
  const [userId, setUserId] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [playlistData, setPlaylistData] = useState([])
  const [allData, setAllData] = useState([])
  const [genres, setGenres] = useState({ selectedGenre: '', listOfGenresFromAPI: [] })
  const [playlist, setPlaylist] = useState({ selectedPlaylist: '', listOfPlaylistFromAPI: [] })

  const encoded = process.env.REACT_APP_ENCODED

  // One time call to get Spotify Access Token and access all Music Categories
  // useEffect(() => {
    // API Access token
  //   axios("https://accounts.spotify.com/api/token", {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Basic ${encoded}=`,
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     data: 'grant_type=client_credentials'
  //   })
  //     .then(response => {
  //       console.log("Access token: ", response.data.access_token)
  //       setAccessToken(response.data.access_token);

  //       axios('https://api.spotify.com/v1/browse/categories', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${response.data.access_token}`
  //         }
  //       })
  //         .then(genreResponse => {
  //           setGenres({
  //             selectedGenre: genres.selectedGenre,
  //             listOfGenresFromAPI: genreResponse.data.categories.items
  //           })
  //         })
  //     })
  //     .catch(err => console.log("Error! ", err))
  // }, [genres.selectedGenre, encoded]);

  /// After selection of genre, produces category ID to retrieve appropriate playlists
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

  /// After selection of playlist, produces playlist ID to retrieve the tracks from playlist
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
    axios.delete(`https://musiqle-back-end-w9vy.onrender.com/user/${userId}`)
    userSignOut()
  };

  //// NEED TO BE UPDATED TO REFLECT CHANGES IN DB FOR USER, CURRENTLY NOT GETTING SAVED AND RESETTING ON REFRESH
  const updateLongestStreak=(streak) => {
    const currentStreak = userData.longestStreak
    if (streak > currentStreak) {
      axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userId}/longeststreak`,
      {"longestStreak": streak})
    }
  }
  const increaseCurrentScore = (attemptsLeft) => {
    setScore(score + points[attemptsLeft])
  }

  const updateTotalScore = (totalscore) => {
    console.log(userId, "id")
    axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userId}/totalscore`,
    {"totalScore": totalscore})
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
              playlistName={playlist.selectedPlaylist}
              playlistData={playlistData}
              userData = {userData}
              increaseStreak={updateLongestStreak}
            />
          }
        />
        <Route
          path="/song"
          element={ user?
            <Song
              userData = {userData}
              increaseStreak={updateLongestStreak}
              increaseTotalScore={updateTotalScore}
            />
          : <SignInpPopUp/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
