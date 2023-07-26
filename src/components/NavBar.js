import React from "react";
import { Nav, NavLink, NavMenu } from "./NavBarElements";
import './NavBar.css'

const NavBar = () => {
    return (
        <>
            <Nav>
                <NavMenu className="nav-container">
                    <NavLink to="/home" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/album" activeStyle>
                        Album
                    </NavLink>
                    <NavLink to="/song" activeStyle>
                        Song
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default NavBar;

