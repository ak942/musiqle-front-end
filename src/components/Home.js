import React from "react";
import { Link } from "react-router-dom";
import './home.css'
import SpotifyPopUp from './SpotifyPopUp'

const Home = ({user, findUser}) => {
    const [clicked, setClicked] = React.useState(false)

    const spotifyClick = ()=> {
        setClicked(true)
    }
    const close = () => {
        setClicked(false)
    }
    const signIn = () => {
        if (!clicked && !user){
            return (
                <div>
                <button className="circular signin" onClick={spotifyClick}>
                    Sign In To Spotify
                </button>
                <button className="circular signin" onClick={spotifyClick}>
                    Sign In As Guest
                </button>
                </div>
            )
        } else if (user) {
            return (
                `Welcome back ${user.toUpperCase()}`
            )
        }
    }
    return (
        <div className="home">
            <h1 className="welcome-header">Play! Pick Your Path</h1>
            <div className="right">
                {signIn()}
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