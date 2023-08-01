import React from "react";
import { Link } from "react-router-dom";
import './home.css'
import GuestSignIn from "./GuestSignIn";
import SpotifyLoginIn from "./SpotifyLoginIn";
import SpotifyPopUp from './SpotifyPopUp'

const Home = ({user, findUser}) => {
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
                {user? `Welcome back ${user.toUpperCase()}` :  
                <div>
                <button className="circular signin" onClick={spotifyClick}>
                    Sign In To Spotify
                </button>
                <button className="circular signin" onClick={spotifyClick}>
                    Sign In As Guest
                </button>
                </div>
                }
                {clicked? <SpotifyPopUp closeCallBack={close} findUser={findUser}/> : null}
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