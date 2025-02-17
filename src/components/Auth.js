// Auth.js
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebaseConfig"; // adjust path as needed
import Logo from "../assets/Logo.png";
import "./Auth.css";

const auth = getAuth(app);

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  
  const signUp = () => {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed up as:", userCredential.user.email);
        // Clear the form by resetting state
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.error("Sign up error:", err);
        setError(err.message);
      });
  };
  
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const logIn = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in as:", userCredential.user.email);
      // Clear the form by resetting state
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
         <img src={Logo} alt="Logo" className="logo" />
      {/*
        Since App.js is handling the conditional rendering,
        we only render the sign-in/sign-up form here.
      */}
      <h3>Login / Sign Up</h3>
      <form onSubmit={logIn}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(handleEmailChange)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(handlePasswordChange)}
      />
      <br />
      <button onClick={logIn}>Log In</button>
      <button onClick={signUp}>Sign Up</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Auth;
