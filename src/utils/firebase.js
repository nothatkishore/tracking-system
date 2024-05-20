// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbOmKBGX9r49n_HpsssK00mLiLJmtfvk4",
    authDomain: "tracking-system-4b666.firebaseapp.com",
    databaseURL: "https://tracking-system-4b666-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "tracking-system-4b666",
    storageBucket: "tracking-system-4b666.appspot.com",
    messagingSenderId: "130316587884",
    appId: "1:130316587884:web:ee50b53d256618cbaa9949"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { database };
