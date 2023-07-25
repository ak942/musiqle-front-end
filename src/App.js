import logo from './logo.svg';
import './App.css';

function App() {
    return (
<<<<<<< HEAD
        <Router className="router">
            <Navbar className= "nav" />
=======
        <Router>
            <Navbar />
>>>>>>> parent of 87c9421 (changes to home app)
            <Routes>
                <Route exact path='/' exact element={<Home />} />
                <Route path='/album' element={<Album />} />
                <Route path='/song' element={<Song />} />
            </Routes>
        </Router>
    );
}

export default App;
