import React from "react";
import { Link } from "react-router-dom";
import './home.css'
import SignInPopUp from './SignInpPopUp'
<<<<<<< HEAD
import Dropdown from "./Dropdown";
import Stats from './Stats'

const Home = ({ user, userData, deleteUser, userSignOut, findUser, genreChanged, genreOptions, selectedGenre, playlistOptions, selectedPlaylist, playlistChanged }) => {
    const [clicked, setClicked] = React.useState(false)
    const [stats, setStats] = React.useState(false)
=======
import { useState } from "react";

const Home = ({ user, deleteUser, userSignOut, findUser }) => {


    const [clicked, setClicked] = useState(false)
>>>>>>> d21281babd28864c227d011fe407decae494f6f6

    const openPopUp = () => {
        setClicked(true)
    }
    const closePopUp = () => {
        setClicked(false)
    }
    const openStats = () => {
        setStats(true)
    }
    const closeStats = () => {
        setStats(false)
    }
    const showUserStats= () => {
        if (stats) {
            return <Stats closeStats={closeStats} userData={userData}/>
        } else {
            return <button className ="user-login-btn" onClick = {openStats}>Stats</button>
        }
    }
    const signIn = () => {
        if (!clicked && !user) {
            return (
                <div>
                    {/* <button className="circular signin" onClick={spotifyClick}>
                        Sign In To Spotify
                    </button> */}
                    <button className="signin-btn" onClick={openPopUp}>
                        Sign In
                    </button>
                </div>
            )
        } else if (user) {
            return (
                <section className="user-login-page">
                    <h4 className="user-header">Welcome Back, {user.charAt(0).toUpperCase() + user.slice(1)}!</h4>
                    {showUserStats()}
                    <button className = "user-login-btn" onClick = {deleteUser}> Delete </button>
                    <button className = "user-login-btn" onClick = {userSignOut}> Sign Out </button>
                </section>
            )
        }
    }
    return (
        <div className="home">
            <h1 className="musiqle-header">Musiqle</h1>
            <h1 className="welcome-header">Play! Pick Your Path</h1>
            <div className="right">
                {signIn()}
            </div>
            <div>
                {clicked ? <SignInPopUp closeCallBack={closePopUp} findUser={findUser} /> : null}
            </div>
            <br />
<<<<<<< HEAD
            {/* <Dropdown
                genreOptions={genreOptions}
                genreChanged={genreChanged}
                selectedGenre={selectedGenre}
                playlistChanged={playlistChanged}
                playlistOptions={playlistOptions}
                selectedPlaylist={selectedPlaylist}
            /> */}
=======

>>>>>>> d21281babd28864c227d011fe407decae494f6f6
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