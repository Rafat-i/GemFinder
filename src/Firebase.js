// src/Firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database'; // Correct import for Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyAQ7pxrOXCsj6hpc_dCWPA40-qNBgAtQ18",
  authDomain: "gemfindercryptoproject.firebaseapp.com",
  projectId: "gemfindercryptoproject",
  storageBucket: "gemfindercryptoproject.appspot.com",
  messagingSenderId: "120912140305",
  appId: "1:120912140305:web:23a974424008b1cb2d39b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app); // Initialize Realtime Database

export { auth, db, database };
