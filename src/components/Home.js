import React from "react";
import { Link } from "react-router-dom";
import './home.css'
import SignInPopUp from './SignInpPopUp'
import { useState } from "react";

const Home = ({ user, deleteUser, userSignOut, findUser }) => {


    const [clicked, setClicked] = useState(false)

    const openPopUp = () => {
        setClicked(true)
    }
    const closePopUp = () => {
        setClicked(false)
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
                    <button className = "user-login-btn" onClick = {userSignOut}> Sign Out </button>
                    <button className = "user-login-btn" onClick = {deleteUser}> Delete </button>
                </section>
            )
        }
    }
    return (
        <div className="home">
            <h1 className="welcome-header">Play! Pick Your Path</h1>
            <div className="right">
                {signIn()}
            </div>
            <div>
                {clicked ? <SignInPopUp closeCallBack={closePopUp} findUser={findUser} /> : null}
            </div>
            <br />

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