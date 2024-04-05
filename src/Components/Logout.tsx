import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LogoutProps {
  onLogout: () => void; // Define the onLogout prop
}

const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage

      await axios.post('https://tmu-classifieds.onrender.com/app/logout/', { token }); // Send logout request to backend

      // Clear authentication data from local storage
      localStorage.removeItem('username')
      localStorage.removeItem('token');
      localStorage.removeItem('userId')

      // Call the onLogout function passed from the parent component
      onLogout();
      
      // Redirect to login page
      navigate('/login'); // Redirect to login page using useNavigate hook
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout error
    }
  };

  return (
    <Button variant="outlined" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;