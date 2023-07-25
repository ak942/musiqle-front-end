import React from 'react';
import './App.css';
import Navbar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Routes, Route }from 'react-router-dom';
import Home from './pages/Home';
import Album from './pages/Album';
import Song from './pages/Song';


function App() {
    return (
        <Router>
            <Navbar className= "nav" />
            <Routes>
                <Route exact path='/' exact element={<Home />} />
                <Route path='/album' element={<Album />} />
                <Route path='/song' element={<Song />} />
            </Routes>
        </Router>
    );
}

export default App;
