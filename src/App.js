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
  const [clicked, setClicked] = useState(false)
  const [streak, setStreak] = useState(0)
  const [playlistData, setPlaylistData] = useState([])
  
  // Retrieves tracks from ADA C19 Playlist as default selected playlist
  useEffect(() => {
    // const playlistID = "1ap9564Wpqxi2Bb8gVaSWc"
    try {
      axios.get(`http://localhost:8080/playlists/${playlist.selectedPlaylist}`)
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
  ///Close Pop Up
    const closePopUp = () => {
      setClicked(false)
      console.log("here")
    }
    
  ///Song Component Rendered
  // const songComponent = () =>{
  //   if (user) {
  //     return (
  //     <Song
  //     userData = {userData}
  //     increaseStreak={updateLongestStreak}
  //     increaseTotalScore={updateTotalScore}
  //   />)
  //   } else if (clicked) {
  //     return (
  //           <SignInpPopUp 
  //           closeCallBack = {closePopUp} 
  //           findUser={getUserData}/>)
  //   } else {
  //     console.log("close")
  //   }
  // }
  
  // Retrieves list of genres from Spotify API
  useEffect(() => {
    try {
      axios.get("http://localhost:8080/genres")
          .then(genreResponse => {
              setGenres({
                  selectedGenre: genres.selectedGenre,
                  listOfGenresFromAPI: genreResponse.data.categories.items
              })
          })
    } catch {
      console.log("Could not retrieve genres.")
    } try {
      axios.get(`http://localhost:8080/playlists/${playlist.selectedPlaylist}`)
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

      axios.get(`http://localhost:8080/genres/${val}/playlists`)
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

      axios.get(`http://localhost:8080/playlists/${val}`)
          .then(tracksResponse => {
              setPlaylistData(tracksResponse.data.items)
          })
          .catch(err=>console.log("Error! ", err))
  }


  //// Score mechanics to update state and user database
  const updateLongestStreak=(streak) => {
    const currentStreak = userData.longestStreak
    if (streak > currentStreak) {
      axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userId}/longeststreak`,
      {"longestStreak": streak})
    }
  }

  const increaseCurrentScore = (score) => {
    try {
      axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userData.id}/score`, score) 
      .then(console.log("Score updated!"))

      if (userData.bestOverallScore < score) {
        axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userData.id}/bestoverallstreak`, score)
        .then(console.log("Best overall score updated!"))
      }

    } catch {
      console.log("Score could not be updated.")
    }
  }

  const increaseStreak = () => {
    try {
      axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userData.id}/streak`, streak)
      .then(console.log("Streak updated!"))

      if (userData.longestStreak < streak) {
          axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userData.id}/longeststreak`, streak)
          .then(console.log("Longest streak updated!"))
        }

    } catch {
      console.log("Streak could not be updated.")
    }
  }

  const increaseTotalScore = (totalScore) => {
    try {
      axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/{userID}/totalscore`, totalScore)
      .then(console.log("Total score updated!"))
    } catch {
      console.log("Total score could not be updated.")
    }
  }

  const resetScore = (score) => {
    try {
      axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/{userID}/score`, score)
      .then(console.log("Score returned to 0!"))
    } catch {
      console.log("Score could not be updated.")
    }
  }

  const resetStreak = () => {
    setStreak(0)
  }

  const updateTotalScore = (totalscore) => {
    console.log(userId, "id")
    const currentTotalScore = userData.totalScore
    axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userId}/totalscore`,
    {"totalScore": totalscore})
  }

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
              // closePopUp = {closePopUp}
              deleteUser = {deleteUser}
              userSignOut = {userSignOut}
            />
          }
        />
        <Route
          path="/album"
          element={user ? <Album
              playlistData={playlistData}
              userData = {userData}
              increaseCurrentScore={increaseCurrentScore}
              increaseStreak={updateLongestStreak}
              genreChanged={genreChanged}
              genreOptions={genres.listOfGenresFromAPI}
              selectedGenre={genres.selectedGenre}
              playlistChanged={playlistChanged}
              playlistOptions={playlist.listOfPlaylistFromAPI}
              selectedPlaylist={playlist.selectedPlaylist}
            /> : <SignInpPopUp 
            closeCallBack = {closePopUp} 
            findUser={getUserData}/>}
        />
        <Route
          path="/song"
          element={user ? <Song
            playlistData = {playlistData}
            userData = {userData}
            increaseStreak={updateLongestStreak}
            increaseTotalScore={updateTotalScore}
            genreChanged={genreChanged}
            genreOptions={genres.listOfGenresFromAPI}
            selectedGenre={genres.selectedGenre}
            playlistChanged={playlistChanged}
            playlistOptions={playlist.listOfPlaylistFromAPI}
            selectedPlaylist={playlist.selectedPlaylist}
          /> : <SignInpPopUp 
          closeCallBack = {closePopUp} 
          findUser={getUserData}/>}

        
        />
      </Routes>
    </Router>
  );
}

export default App;
