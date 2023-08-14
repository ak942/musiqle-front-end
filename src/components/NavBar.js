import React from "react";
import { Nav, NavLink, NavMenu } from "./NavBarElements";
import Dropdown from './Dropdown'
import './navbar.css'

const NavBar = ({ handleReset, genreOptions, genreChanged, selectedGenre, playlistOptions, playlistChanged, selectedPlaylist }) => {
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
                    />
                </div>
                <div className="dropdown-bar">
                    <Dropdown
                        options={playlistOptions}
                        changed={playlistChanged}
                        selected={selectedPlaylist}
                    />
                </div>
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

