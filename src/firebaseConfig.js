import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCBJJC0xgrF8MkKOmNWsAU9whioz68FKqA",
  authDomain: "skeg-inventory-management.firebaseapp.com",
  projectId: "skeg-inventory-management",
  storageBucket: "skeg-inventory-management.firebasestorage.app",
  messagingSenderId: "437729522224",
  appId: "1:437729522224:web:44106b82b795ce731eb3f5",
  measurementId: "G-T18T2TBMEK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

export { app, db };