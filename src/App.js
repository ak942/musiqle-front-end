import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Album from "./components/Album";
import Song from "./components/Song";
import userinfo from "./dummy_data_user.json"
import { useState } from "react";

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
            <Home />
          }
        />
        <Route
          path="/album"
          element={
            <Album
              points={points}
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
              points={points}
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
