import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate} from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track authentication status
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = async () => {
    try {
      // Basic form validation
      if (!username || !password) {
        setError('Please enter both username and password.');
        return;
      }

      const response = await axios.post('http://localhost:8000/app/login/', { 'username': username, 'password': password });
      const { token, username: loggedInUsername } = response.data; // Extract username from response

      // Store username in local storage or state for later use (optional)
      localStorage.setItem('username', loggedInUsername);

    //After successful login, set isLoggedIn to true and store authentication data (e.g., token) in local storage
      setIsLoggedIn(true);
      localStorage.setItem('token', 'your-auth-token'); // Replace 'your-auth-token' with the actual token

      console.log(response.data);
      //navigate('/');
      navigate('/', { state: { token } });
      // Handle successful login (redirect user, set authentication state, etc.)
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (display error message, reset form, etc.)
      setError('Failed to login. Please check your username and password.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div> {/* Wrap each input field with a div */}
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      </div>
      <div> {/* Wrap each input field with a div */}
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      </div>
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <p>New User? <Link to="/signup">Sign Up</Link></p> {/* "New User?" text with Sign Up link */}
    </div>
  );
};

export default Login;