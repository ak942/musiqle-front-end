import React from "react";
import { Link } from "react-router-dom";
import './home.css'
import SignInPopUp from './SignInpPopUp'
import Dropdown from "./Dropdown";

const Home = ({ user, deleteUser, userSignOut, findUser, genreChanged, genreOptions, selectedGenre, playlistOptions, selectedPlaylist, playlistChanged }) => {
    const [clicked, setClicked] = React.useState(false)

    const spotifyClick = () => {
        setClicked(true)
    }
    const close = () => {
        setClicked(false)
    }
    const signIn = () => {
        if (!clicked && !user) {
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
                <section>
                    <h4>Welcome back, {user.charAt(0).toUpperCase() + user.slice(1)}!</h4>
                    <button onClick = {userSignOut}> Sign Out </button>
                    <button onClick = {deleteUser}> Delete User </button>
                </section>
            )
        }
    }
    return (
        <div className="home">
            <h1 className="welcome-header">Play! Pick Your Path</h1>
            <div className="right">
                {signIn()}
                {clicked ? <SignInPopUp closeCallBack={close} findUser={findUser} /> : null}
            </div>
            <br />
            <Dropdown
                genreOptions={genreOptions}
                genreChanged={genreChanged}
                selectedGenre={selectedGenre}
                playlistChanged={playlistChanged}
                playlistOptions={playlistOptions}
                selectedPlaylist={selectedPlaylist}
            />
            <ul className="link-container">
                <li className="link-list">
                    <div className="link">
                        <Link to="/album">
                            Album
                        </Link>
                    </div>
                </li>
                <li className="link-list">
                    <div className="link">
                        <Link to="/song">
                            Song
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Home;