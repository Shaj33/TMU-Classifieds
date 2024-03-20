import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const NavBarWindow = styled.div`
    height: 100vh;
    width: 10%;
    padding-top: 40px;
    border-right: 2px solid black;
`

function NavBar(): JSX.Element {
    return (
        <NavBarWindow>
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                <Link to="/newpost">
                    Add a New Post
                </Link>
            </div>
            <div>
                <Link to="/communication">
                    Messages
                </Link>
            </div>

        </NavBarWindow>
    )
}

export default NavBar