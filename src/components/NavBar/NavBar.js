import React from "react";
import {NavLink }from "react-router-dom";
import './navbar.css'

const Navbar = () => {
    return (
        <>
            <nav>
                <div className="nav-container">
                    <NavLink className= "nav-link" to="/album" activeStyle>
                        Album
                    </NavLink>
                    <NavLink className= "nav-link" to="/song" activeStyle>
                        Song
                    </NavLink>
                </div>
            </nav>
        </>
    );
};

export default Navbar;

