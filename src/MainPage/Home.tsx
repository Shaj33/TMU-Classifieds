import React from 'react';
import { useState, useEffect } from 'react';
//Home page component
function Home(): JSX.Element {
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Fetch the username from local storage
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      }, []); // Run this effect only once on component mount
    

    return (
        <div>
            <h2>We live in a blogciety</h2>
            <p style={{ fontSize: '24px' }}>Welcome! {username}</p>
            </div>
    );
}

export default Home;