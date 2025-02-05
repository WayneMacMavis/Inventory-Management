// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCBJJC0xgrF8MkKOmNWsAU9whioz68FKqA",
    authDomain: "skeg-inventory-management.firebaseapp.com",
    projectId: "skeg-inventory-management",
    storageBucket: "skeg-inventory-management.firebasestorage.app",
    messagingSenderId: "437729522224",
    appId: "1:437729522224:web:44106b82b795ce731eb3f5",
    measurementId: "G-T18T2TBMEK"
  };

  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export the Firestore instance
export { db };