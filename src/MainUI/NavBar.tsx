import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logout from '../Components/Logout';

const NavBarWindow = styled.div`
    width: 10%;
    padding-top: 40px;
    border-right: 2px solid black;
`;

function NavBar(): JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('token')); // Check if token exists in local storage

    const handleLogout = () => {
        // Clear authentication data from local storage
        localStorage.removeItem('token');
        // Update isLoggedIn state
        setIsLoggedIn(false);
    };

    return (
        <NavBarWindow>
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                <Link to="/newpost">Add a New Post</Link>
            </div>
            {isLoggedIn ? ( // Check if user is logged in
                <div>
                    <Logout onLogout={handleLogout} /> {/* Render logout button */}
                </div>
            ) : (
                <div>
                    <Link to="/login">Login</Link> {/* Render login link */}
                </div>
            )}
            <div>
                <Link to="/viewAds">
                    View Ads
                </Link>
            </div>
            <div>
                <Link to="/communication">
                    Messages
                </Link>
            </div>
            <div>
                <Link to="/dashboard">
                    Admin Dashboard
                </Link>
            </div>
        </NavBarWindow>
    );
}

export default NavBar;
