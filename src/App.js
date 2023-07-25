import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <Router className="router">
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
