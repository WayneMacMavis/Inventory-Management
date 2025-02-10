import React, { useState, useEffect } from 'react';

const AutoLogout = ({ onLogout }) => {
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      setTimer(setTimeout(onLogout, 6000)); // 10 minutes in milliseconds
    };

    // Event listeners for user activity
    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    // Initialize the timer
    resetTimer();

    // Cleanup event listeners on component unmount
    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (timer) clearTimeout(timer);
    };
  }, [onLogout]);

  return null; // This component doesn't render anything
};

export default AutoLogout;
