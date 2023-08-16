import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Artist from "./components/Artist";
import Song from "./components/Song";
import { useState, useEffect } from "react";
import axios from 'axios';
import SongRules from "./components/SongRules";
import ArtistRules from "./components/ArtistRules";

function App() {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState({})
  const [userId, setUserId] = useState(null)
  const [allData, setAllData] = useState([])
  const [genres, setGenres] = useState({ selectedGenre: '', listOfGenresFromAPI: [] })
  const [playlist, setPlaylist] = useState({ selectedPlaylist: '1ap9564Wpqxi2Bb8gVaSWc', listOfPlaylistFromAPI: [] })
  const [playlistData, setPlaylistData] = useState([])
  const [songRules, setSongRules] = useState(true)
  const [artistRules, setArtistRules] = useState(true)

  // Retrieves tracks from ADA C19 Playlist as default selected playlist
  useEffect(() => {
    // const playlistID = "1ap9564Wpqxi2Bb8gVaSWc"
    try {
      axios.get(`https://musiqle-back-end-w9vy.onrender.com/playlists/${playlist.selectedPlaylist}`)
        .then(tracksResponse => {
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
      })
      .catch(err => console.log("Error! ", err))
  }, []);

  /// Adding User to DB
  const addNewUser = (newUserData) => {
    axios.post('https://musiqle-back-end-w9vy.onrender.com/user', newUserData)
  }

  const refreshData = async () => {
    await axios.get('https://musiqle-back-end-w9vy.onrender.com/user')
      .then((response) => {
        setAllData(response.data)
      })
    getUserData(user)

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
      "bestScoreArtist": 0,
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
    }
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
          listOfPlaylistFromAPI: playlistResponse.data.playlists.items.filter(playlist => !!playlist)
        })
      })
      .catch(err => console.log("Error! ", err))
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
      .catch(err => console.log("Error! ", err))
  }

  const openSongRules = () => {
    setSongRules(true)
  }

  const closeSongRules = () => {
    setSongRules(false)
  }


  const showSongRules = () => {
    // toggleSongRules()
    if (songRules) {
      return (
        <SongRules
          closeCallBack={closeSongRules}
        />
      )
    } else {
      return <button className="rules-btn" onClick={openSongRules}>Rules</button>
    }
  }

  const openArtistRules = () => {
    setArtistRules(true)
  }

  const closeArtistRules = () => {
    setArtistRules(false)
  }


  const showArtistRules = () => {
    // toggleArtistRules()
    if (artistRules) {
      return (
        <ArtistRules
          closeCallBack={closeArtistRules}
        />
      )
    } else {
      return <button className="rules-btn" onClick={openArtistRules}>Rules</button>
    }
  }



  //// Updates User DB Stats
  const updateData = async (streak, score, totalscore) => {
    const currentLongestStreak = userData.longestStreak
    console.log("streak", userId, streak)
    await
      axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userId}/streak`,
        { "streak": streak })
    if (streak > currentLongestStreak) {
      await
        axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userId}/longeststreak`,
          { "longestStreak": streak })
          .then(console.log("Success"))
    }
    await
      axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userId}/score`,
        { "score": score })
    if (userData.bestOverallScore < score) {
      await axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userId}/bestoverallscore`,
        { "bestOverallScore": score })
    }
    await axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userId}/totalscore`,
      { "totalScore": totalscore })

  }

  // /// Update Current Score API Call to DB
  // const updateCurrentScore = async (score) => {
  //   await 
  //     axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userId}/score`,
  //       { "score": score })
  //   // } catch {
  //   //   console.log("Score could not be updated.")
  //   // }
  //   if (userData.bestOverallScore < score) {
  //     try {axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userId}/bestoverallscore`,
  //       { "bestOverallScore": score })
  //       .then(console.log("Success"))
  //   } catch {
  //     console.log("Score could not be updated.")
  //   }
  // }}

  // ///Update Total Score Call API Patch to DB
  // const updateBestOverallScore = (totalscore) => {
  //   try {
  //     axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userId}/totalscore`,
  //       { "totalScore": totalscore })
  //       .then(console.log("Success"))
  //   } catch {
  //     console.log("Total score could not be updated")
  //   }
  // }

  ///Update BestScore Song API Patch Call to DB
  const updateBestScoreSong = (score) => {
    const bestDBScoreSong = userData.bestScoreSong
    if (score > bestDBScoreSong) {
      try {
        axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userId}/bestscoresong`,
          { "bestScoreSong": score })
          .then(console.log("Success"))
      } catch {
        console.log("Song score could not be updated")
      }
    }
  }

  ///Update BestScore Artist API Patch Call to DB
  
  const updateBestScoreArtist = (score) => {
    const bestDBScoreArtist = userData.bestScoreArtist
    if (score > bestDBScoreArtist) {
      try {
        axios.patch(`https://musiqle-back-end-w9vy.onrender.com/user/${userId}/bestscoreartist`,
          { "bestScoreArtist": score })
          .then(console.log("Success"))
      } catch {
        console.log("Artist score could not be updated")
      }
    }
  }

  return (
    <Router>
      <Routes>
        <Route
          exact path="/"
          element={
            <Home
              allData={allData}
              user={user}
              userData={userData}
              findUser={getUserData}
              deleteUser={deleteUser}
              userSignOut={userSignOut}
            />}
        />
        <Route
          path="/artist"
          element={<Artist
            refreshData={refreshData}
            showRules={showArtistRules}
            playlistData={playlistData}
            userData={userData}
            updateData={updateData}
            genreChanged={genreChanged}
            updateBestScoreArtist = {updateBestScoreArtist}
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
            refreshData={refreshData}
            showRules={showSongRules}
            playlistData={playlistData}
            userData={userData}
            updateData={updateData}
            updateBestScoreSong = {updateBestScoreSong}
            // updateLongestAndCurrentStreak={updateLongestAndCurrentStreak}
            // updateBestScoreSong={updateBestScoreSong}
            // updateBestOverallScore={updateBestOverallScore}
            // updateCurrentScore={updateCurrentScore}
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
