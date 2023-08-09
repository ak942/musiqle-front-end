import React from "react";
import { Nav, NavLink, NavMenu } from "./NavBarElements";
import Dropdown from './Dropdown'
import './navbar.css'

const NavBar = ({ genreOptions, genreChanged, selectedGenre, playlistOptions, playlistChanged, selectedPlaylist }) => {
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
            </NavMenu>
        </Nav>
    );
};

export default NavBar;

