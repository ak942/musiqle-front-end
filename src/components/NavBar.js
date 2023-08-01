import React from "react";
import { Nav, NavLink, NavMenu } from "./NavBarElements";
import './navbar.css'

const NavBar = () => {
    return (
        <Nav>
            <NavMenu className="nav-container">
                <NavLink className="nav-link" to="/" activeStyle>
                    Return to Home
                </NavLink>
            </NavMenu>
        </Nav>
    );
};

export default NavBar;

