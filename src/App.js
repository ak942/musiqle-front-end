import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Album from "./components/Album";
// import ContactUs component
import Song from "./components/Song";
import songinfo from "./dummy_data.json"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/album" element={<Album url={songinfo[0].album.images[0].url} />} />
          <Route path="/song" element={<Song />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
