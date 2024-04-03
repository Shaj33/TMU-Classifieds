import React, { useEffect } from 'react';
useEffect(() => {
    let timeout: NodeJS.Timeout;
  
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        alert('Your session will expire soon. Please refresh the page or log in again.');
        // Perform any other action you want to take when the session is about to expire
      }, 3600000); // 1 hour in milliseconds
  
      // Add event listeners to reset the timer when user interacts with the page
      window.addEventListener('mousemove', resetTimer);
      window.addEventListener('keydown', resetTimer);
    };
  
    // Initial call to resetTimer to start the session timeout countdown
    resetTimer();
  
    // Cleanup function to remove event listeners when the component is unmounted
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, []);