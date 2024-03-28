import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSignUp = async () => {
    // Client-side form validation
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/app/register/', {
        username: username,
        email: email,
        password1: password,
        password2: confirmPassword
      });
      console.log(response.data);
      // Clear form fields
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      // Display success message to the user
      setSuccessMessage('Registration successful! You can now log in.');
      setError(''); // Clear any previous error messages
      // Redirect user to the home page after successful registration
      navigate('/'); // Assuming your home page route is '/'
    } catch (error: any) {
        //console.error('Registration failed:', error);
        console.log('Error:', error);
      // Handle registration error
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Failed to register. Please try again.');
      } else {
        setError('Failed to register. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <div>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {error && <Typography color="error">{error}</Typography>}
      {successMessage && <Typography style={{ color: 'green' }}>{successMessage}</Typography>}
      <Button variant="contained" color="primary" onClick={handleSignUp}>
        Sign Up
      </Button>
    </div>
  );
};

export default SignUp;