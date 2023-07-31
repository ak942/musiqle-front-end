import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Album from "./components/Album";
import Song from "./components/Song";
import { useState } from "react";


function App() {

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
              // inputAnswer={inputAnswer}
              // setInputAnswer={setInputAnswer}
            />}
        />
        <Route
          path="/song"
          element={
            <Song
              // inputAnswer={inputAnswer}
              // setInputAnswer={setInputAnswer}
            />}
        />
      </Routes>
    </Router>
  );
}

export default App;
