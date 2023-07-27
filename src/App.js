import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Album from "./components/Album";
import Song from "./components/Song";
import albuminfo from "./dummy_data_album.json"
import { useState } from "react";

function App() {

  const randomNum = Math.floor(Math.random() * albuminfo.length)
  const albumImage = albuminfo[randomNum].album.images[0].url
  const albumName = albuminfo[randomNum].album.name

  const [inputAnswer, setInputAnswer] = useState("")

  



  return (
    <>
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
                url={albumImage}
                name={albumName}
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
    </>
  );
}

export default App;
