import React from "react";
import { Link } from "react-router-dom";
import './home.css'
import SignInPopUp from './SignInpPopUp'
// import Dropdown from "./Dropdown";
import Stats from './Stats'
import logo from '../Resources/Musiqle-logo.png'
import DeleteUser from "./DeleteUser";
import AllPlayerStats from "./AllPlayerStats";
// import Rules from "./Rules";

const Home = ({ allData, user, userData, deleteUser, userSignOut, findUser }) => {
    const [signInClicked, setSignInClicked] = React.useState(false)
    const [stats, setStats] = React.useState(false)
    const [allStats, setAllStats] = React.useState(false)

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
    const openAllStats = () => {
        setAllStats(true)
    }
    const closeAllStats = () => {
        setAllStats(false)
    }

    const openDeleteUser = () => {
        setDeleteModal(true)
    }
    const closeDeleteUser = () => {
        setDeleteModal(false)
    }
    const deleteAndCloseUser = () => {
        deleteUser()
        closeDeleteUser()
    }


    const showAllUserStats = () => {
        if (allStats) {
            return (
                <AllPlayerStats
                    closeStats={closeAllStats}
                    allData={allData}
                />
            )
        } else {
            return (<button className="all-stats-btn" onClick={openAllStats}>
                View All Players' Stats
            </button>)
        }
    }

    const showUserStats = () => {
        if (stats) {
            return <Stats closeStats={closeStats} userData={userData} />
        } else {
            return <button className="user-login-btn" onClick={openStats}>Stats</button>
        }
    }
    const showDeleteUser = () => {
        if (deleteModal) {
            return <DeleteUser userData={userData} deleteUser={deleteAndCloseUser} closeDeleteUser={closeDeleteUser} />
        } else {
            return <button className="user-login-btn" onClick={openDeleteUser}> Delete </button>
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
                    <h4 className="user-header">Welcome, {user.charAt(0).toUpperCase() + user.slice(1)}!</h4>
                    {showUserStats()}
                    {showDeleteUser()}
                    <button className="user-login-btn" onClick={userSignOut}> Sign Out </button>
                </section>
            )
        }
    }
    const showArtistComponent = () => {
        if (user) {
            return (<Link to="/artist">Artist</Link>)
        } else {
            return (<Link onClick={openPopUp} to="/">Artist</Link>)
        }
    }
    const showSongComponent = () => {
        if (user) {
            return (<Link to="/song">Song</Link>)
        } else {
            return (<Link onClick={openPopUp} to="/">Song</Link>)
        }
    }
    return (
        <div>
            {/* <h1 className="musiqle-header">Musiqle</h1> */}
            <div className="home">
                <img className="musiqle-logo" alt="musiqle logo" src={logo} />
                {/* <h1 className="welcome-header">Choose A Game!</h1> */}
                <div className="left sign-in">
                    {showAllUserStats()}
                </div>
                <div className="right sign-in">
                    {signIn()}
                </div>
                <div>
                    {signInClicked ? <SignInPopUp closeCallBack={closePopUp} findUser={findUser} /> : null}
                </div>
                <br />
                <ul className="link-container">
                    <li className="link-list">
                        <div className="link">
                            {showArtistComponent()}
                        </div>
                    </li>
                    <li className="link-list">
                        <div className="link">
                            {showSongComponent()}
                        </div>
                    </li>
                </ul>

            </div>
        </div>
    );
};

export default Home;