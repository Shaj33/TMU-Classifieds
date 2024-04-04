import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logout from '../Components/Logout';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';


function NavBar(): JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('token')); // Check if token exists in local storage
    const [isUserStaff, setIsUserStaff] = useState(false);

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    useEffect(() => {
        const fetchIfUserIsStaff = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/app/get_is_user_staff/?userId=${localStorage.getItem('token')}`);

                if (!response.ok) {
                    throw new Error("Server responded with status: " + response.status);
                }

                const jsonData = await response.json();

                if (jsonData.error) {
                    throw new Error("Error getting data: " + jsonData.error);
                }

                setIsUserStaff(jsonData.is_staff);
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
        if (Boolean(localStorage.getItem('token'))) {
            setIsLoggedIn(true);
            fetchIfUserIsStaff();
        }
    }, []);

    const handleLogout = () => {
        // Clear authentication data from local storage
        localStorage.removeItem('token');
        // Update isLoggedIn state
        setIsLoggedIn(false);
        setIsUserStaff(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            paddingLeft: 2
                        }}
                    >
                        TMU Classified
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >

                            <MenuItem onClick={handleCloseNavMenu} href='/' component="a">
                                <Typography textAlign="center">View Ads</Typography>
                            </MenuItem>


                            {isLoggedIn && <>
                                <MenuItem onClick={handleCloseNavMenu} href='/newpost' component="a">
                                    <Typography textAlign="center">Add a New Post</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu} href='/communication' component="a">
                                    <Typography textAlign="center">Messages</Typography>
                                </MenuItem>
                            </>
                            }


                            {isLoggedIn && isUserStaff &&
                                <MenuItem onClick={handleCloseNavMenu} href='/dashboard' component="a">
                                    <Typography textAlign="center">Admin Dashboard</Typography>
                                </MenuItem>
                            }


                            {isLoggedIn ?
                                <MenuItem onClick={() => { handleCloseNavMenu(); handleLogout() }}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                                :
                                <MenuItem onClick={handleCloseNavMenu} href='/login' component="a">
                                    <Typography textAlign="center">Login</Typography>
                                </MenuItem>
                            }

                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        TMU Classified

                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        <Button
                            href='/viewAds'
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            View Ads
                        </Button>

                        {isLoggedIn && <>
                            <Button
                                href='/newpost'
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Add a New Post
                            </Button>
                            <Button
                                href='/communication'
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Messages
                            </Button>
                        </>
                        }


                        {isLoggedIn && isUserStaff &&
                            <Button
                                href='/dashboard'
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Admin Dashboard
                            </Button>
                        }


                        <Box sx={{ flexGrow: 1 }} />

                        {isLoggedIn ?
                            <Button
                                onClick={() => { handleCloseNavMenu(); handleLogout() }}
                                sx={{ my: 2, color: 'white', display: 'block', paddingX: 3 }}
                            >
                                Logout
                            </Button>
                            :
                            <Button
                                href='/login'
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block', paddingX: 3 }}
                            >
                                Login
                            </Button>
                        }

                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;
