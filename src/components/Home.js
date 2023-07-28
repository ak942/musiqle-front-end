import React from "react";
import { Link } from "react-router-dom";
import './Home.css'

const Home = () => {
    return (
        <div className="home">
            <h1 className="welcome-header">Play! Pick Your Path</h1>
            <div className="right">
                <button className="circular signin">
                    Sign in to Spotify
                </button>
                <button className="circular signin">
                    Sign in as Guest
                </button>
            </div>
            <br />
            <ul className="link-container">
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