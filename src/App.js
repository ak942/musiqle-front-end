import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Routes, Route }from 'react-router-dom';
import Home from './pages/Home'
import Album from './pages/Album'
import Song from './pages/Song'

function App() {
    return (
        <Router className="router">
            <NavBar className= "nav" />
            <Routes>
                <Route exact path='/' exact element={<Home />} />
                <Route path='/album' element={<Album />} />
                <Route path='/song' element={<Song />} />
            </Routes>
        </Router>
    );
}

export default App;
