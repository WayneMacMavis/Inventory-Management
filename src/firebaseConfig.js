// firebaseConfig.js
import firebase from 'firebase/app';
import 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCBJJC0xgrF8MkKOmNWsAU9whioz68FKqA",
    authDomain: "skeg-inventory-management.firebaseapp.com",
    projectId: "skeg-inventory-management",
    storageBucket: "skeg-inventory-management.firebasestorage.app",
    messagingSenderId: "437729522224",
    appId: "1:437729522224:web:44106b82b795ce731eb3f5",
    measurementId: "G-T18T2TBMEK"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = firebase.firestore();
export { firestore };
