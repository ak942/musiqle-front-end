import React from "react";
import { Nav, NavLink, NavMenu }from "./NavBarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
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

export default Navbar;

