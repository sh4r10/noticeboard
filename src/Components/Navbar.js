import React from "react";
import {Link} from "react-router-dom";

function Navbar(){
    return(
        <nav className="navbar navbar-dark navbar-expand-lg" style={{"background": "var(--primary"}}>
            <span className="navbar-brand mb-0 h1">MUNOB</span>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/create" className="nav-link">New Note</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;