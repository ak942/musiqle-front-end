import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Album from "./components/Album";
import Song from "./components/Song";
import { useState } from "react";

function App() {

  const [inputAnswer, setInputAnswer] = useState("")


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
              // url={albumImage}
              // name={albumName}
              inputAnswer={inputAnswer}
              setInputAnswer={setInputAnswer}
            />}
        />
        <Route
          path="/song"
          element={
            <Song
            />}
        />
      </Routes>
    </Router>
  );
}

export default App;
