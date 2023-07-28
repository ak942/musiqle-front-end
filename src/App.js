import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Album from "./components/Album";
import Song from "./components/Song";
import userinfo from "./dummy_data_user.json"
// import { useState } from "react";

const points = {
    4: 10,
    3: 7,
    2: 4,
    1: 1
}


function App() {


  // update to axios calls when back end deployed
  const score = userinfo.user.score 
  const totalScore = userinfo.user.totalScore
  const streak = userinfo.user.streak

  
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
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
