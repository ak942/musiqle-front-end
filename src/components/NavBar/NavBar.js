import React from "react";
import { Nav, NavLink, NavMenu }from "./NavBarElements";

const Navbar = () => {
    return (
        <>
<<<<<<< HEAD
            <nav>
                <div className="nav-container">
                    <NavLink className= "nav-link" to="/album" activeStyle>
=======
            <Nav>
                <NavMenu>
                    <NavLink to="/album" activeStyle>
>>>>>>> parent of 87c9421 (changes to home app)
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

export default Navbar;

