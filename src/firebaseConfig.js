// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCBJJC0xgrF8MkKOmNWsAU9whioz68FKqA",
    authDomain: "skeg-inventory-management.firebaseapp.com",
    projectId: "skeg-inventory-management",
    storageBucket: "skeg-inventory-management.firebasestorage.app",
    messagingSenderId: "437729522224",
    appId: "1:437729522224:web:6bafcc33e49f1f141eb3f5",
    measurementId: "G-WH6XEKR0J4"
  };

  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export the Firestore instance
export { db };