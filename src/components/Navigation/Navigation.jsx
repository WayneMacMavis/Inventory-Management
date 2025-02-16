import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebaseConfig'; // Adjust path as needed
import { FiLogOut } from 'react-icons/fi'; // Import the logout icon
import './Navigation.css';

const auth = getAuth(app);

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      navigate('/'); // Redirect after sign out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleDownload = () => {
    const downloadUrl = 'http://localhost:3000/main.js'; // Replace with your file's URL
    window.electron.initiateDownload(downloadUrl);
  };

  return (
    <nav className="navigation">
      <div className="nav-left">
        <a href="/">Inventory</a>
        <a href="/stock-take">Stock Take</a>
        <a href="/procurement">Procurement</a>
      </div>
      <div className="nav-right">
        {/* Download Button */}
        {/* <button onClick={handleDownload}>Download</button> */}
        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut size={13} color="white" />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
