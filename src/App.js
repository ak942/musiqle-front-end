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

function App() {

  // update to axios calls when back end deployed
  const [score, setScore] = useState(userinfo[0].score)
  const [totalScore, setTotalScore] = useState(userinfo[0].totalScore)
  const [streak, setStreak] = useState(userinfo[0].streak)
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState({})

  const getUserData = (newuser) => {
    //useeffect to put all users into allData
    const allData = userinfo
    console.log(userData)
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
    const specificUserChoosen = specificUser? specificUser : newUserData //postnewuser
    setUser(specificUserChoosen.name)
    setUserData(specificUserChoosen)
    console.log(specificUserChoosen, "new")
    console.log(userData)
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
            <Home user={user} findUser = {getUserData}/>
          }
        />
        <Route
          path="/album"
          element={
            <Album
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
