import React from "react";
import { Link } from "react-router-dom";
import './home.css'
import GuestSignIn from "./GuestSignIn";
import SpotifyLoginIn from "./SpotifyLoginIn";
import SpotifyPopUp from './SpotifyPopUp'

const Home = () => {
    const [clicked, setClicked] = React.useState(false)

    const spotifyClick = ()=> {
        setClicked(true)
    }
    const close = () => {
        setClicked(false)
    }
    return (
        <div className="home">
            <h1 className="welcome-header">Play! Pick Your Path</h1>
            <div className="right">
                <button className="circular signin" onClick={spotifyClick}>
                    Sign in to Spotify
                </button>
                {clicked? <SpotifyPopUp closeCallBack={close}/> : null}
                <SpotifyLoginIn/>
                <GuestSignIn/>
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