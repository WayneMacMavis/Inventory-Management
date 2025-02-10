import { useEffect, useRef, useState } from 'react';

const useIdleTimer = (timeout = 600000) => { // default timeout of 10 minutes
  const [isIdle, setIsIdle] = useState(false);
  const lastActivityTime = useRef(Date.now());
  const intervalRef = useRef(null); // Store interval reference

  const handleActivity = () => {
    lastActivityTime.current = Date.now();
    setIsIdle(false); // Reset idle state when user becomes active
    restartInterval(); // Restart the interval timer
  };

  const restartInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (Date.now() - lastActivityTime.current >= timeout) {
        setIsIdle(true);
        clearInterval(intervalRef.current); // Stop further checks once idle
      }
    }, 1000);
  };

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'click', 'scroll', 'keypress'];
    events.forEach(event => window.addEventListener(event, handleActivity));

    restartInterval(); // Start the interval on mount

    return () => {
      events.forEach(event => window.removeEventListener(event, handleActivity));
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timeout]);

  return isIdle;
};

export default useIdleTimer;
