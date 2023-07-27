import React from "react";
import { Link } from "react-router-dom";
import './home.css'

const Home = () => {
    return (
        <div className="home">
            <h1 className="welcome-header">Play! Pick Your Path</h1>
            <button>Sign In to Spotify(optional)</button>
            <br />
            <ul className="link-container">
                <li className="link-home">
                    <Link to="/"></Link>
                </li>
                <li className="link-list">
                    <div className="link">
                        <Link to="/album">Album</Link>
                    </div>
                </li>
                <li className="link-list">
                    <div className="link">
                        <Link to="/song">Song</Link>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Home;