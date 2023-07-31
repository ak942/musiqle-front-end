import React from "react";
import { Nav, NavLink, NavMenu } from "./NavBarElements";
import './navbar.css'
import UserForm from './UserForm';

const NavBar = () => {
    return (
        <Nav>
            <NavMenu className="nav-container">
                <NavLink className="nav-link" to="/" activeStyle>
                    Return to Home
                </NavLink>
                <UserForm/>
            </NavMenu>
        </Nav>
    );
};

export default NavBar;

