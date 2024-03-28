import React from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/app/logout/');
      console.log(response.data);
      // Handle successful logout
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout error
    }
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;