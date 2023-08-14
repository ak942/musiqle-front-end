import React from "react";
import { Nav, NavLink, NavMenu } from "./NavBarElements";
import Dropdown from './Dropdown'
import './navbar.css'

const NavBar = ({ handleReset, genreOptions, genreChanged, selectedGenre, playlistOptions, playlistChanged, selectedPlaylist }) => {
    const [showGenre, setShowGenre] = React.useState(false)

    const changeShowGenreState = () => {
        setShowGenre(true)
    }
    const defaultPlaylistValue = () => {
        return <option>Select Playlist</option>
    }
    const defaultGenreValue = () => {
        return <option>Select Genre</option>
    }
    const showGenreComponent = () => {
        if (showGenre) {
            return (
            <div className="dropdown-bar">
                <Dropdown 
                options={playlistOptions}
                changed={playlistChanged}
                selected={selectedPlaylist}
                defaultValueName = {defaultPlaylistValue}
                callBack={changeShowGenreState}
                />
            </div>
        )}
    }
    

    return (
        <Nav>
            <NavMenu className="nav-container">
                <NavLink className="nav-link" to="/" activeStyle>
                    Return to Home
                </NavLink>
                <div className="dropdown-bar">
                    <Dropdown
                        options={genreOptions}
                        changed={genreChanged}
                        selected={selectedGenre}
                        defaultValueName = {defaultGenreValue}
                        callBack={changeShowGenreState}
                    />
                </div>
                {/* <div className="dropdown-bar"> */}
                    {/* <Dropdown
                        options={playlistOptions}
                        changed={playlistChanged}
                        selected={selectedPlaylist}
                    /> */}
                {/* </div> */}
                {showGenreComponent()}
                <button 
                    className="nav-circular"
                    onClick={handleReset}
                >
                    Reset
                </button>
            </NavMenu>
        </Nav>
    );
};

export default NavBar;

