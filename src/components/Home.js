import React from "react";
import { Link } from "react-router-dom";
import './home.css'
import SignInPopUp from './SignInpPopUp'
// import Dropdown from "./Dropdown";
import Stats from './Stats'
import logo from '../Resources/Musiqle-logo.png'
import DeleteUser from "./DeleteUser";

const Home = ({ user, userData, deleteUser, userSignOut, findUser, genreChanged, genreOptions, selectedGenre, playlistOptions, selectedPlaylist, playlistChanged }) => {
    const [signInClicked, setSignInClicked] = React.useState(false)
    const [stats, setStats] = React.useState(false)
    const [deleteModal, setDeleteModal] = React.useState(false)

    const openPopUp = () => {
        setSignInClicked(true)
    }
    const closePopUp = () => {
        setSignInClicked(false)
    }
    const openStats = () => {
        setStats(true)
    }
    const closeStats = () => {
        setStats(false)
    }
    const openDeleteUser = () => {
        setDeleteModal(true)
    }
    const closeDeleteUser = () => {
        setDeleteModal(false)
    }
    const deleteAndCloseUser = ()=> {
        deleteUser()
        closeDeleteUser()
    }
    const showUserStats= () => {
        if (stats) {
            return <Stats closeStats={closeStats} userData={userData}/>
        } else {
            return <button className ="user-login-btn" onClick = {openStats}>Stats</button>
        }
    }
    const showDeleteUser = () => {
        if (deleteModal) {
            return <DeleteUser userData={userData} deleteUser={deleteAndCloseUser} closeDeleteUser = {closeDeleteUser}/>
        } else {
            return <button className = "user-login-btn" onClick = {openDeleteUser}> Delete </button>
        }
    }
    const signIn = () => {
        if (!signInClicked && !user) {
            return (
                <div>
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
                    {showDeleteUser()}
                    <button className = "user-login-btn" onClick = {userSignOut}> Sign Out </button>
                </section>
            )
        }
    }
    return (
        <div className="home">
            {/* <h1 className="musiqle-header">Musiqle</h1> */}
            <img className="musiqle-logo" alt="musiqle logo" src={logo}/>
            <h1 className="welcome-header">Play! Pick Your Path</h1>
            <div className="right">
                {signIn()}
            </div>
            <div>
                {signInClicked ? <SignInPopUp closeCallBack={closePopUp} findUser={findUser} /> : null}
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