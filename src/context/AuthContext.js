// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, database } from '../Firebase'; // Import the database
import { ref, get } from 'firebase/database'; // Import Realtime Database functions

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user.uid).then((userData) => {
          setCurrentUser(userData);
        });
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// Function to fetch user data from Realtime Database
const fetchUserData = async (uid) => {
  try {
    console.log(`Fetching data for user UID: ${uid}`); // Log the UID being fetched
    const userRef = ref(database, `users/${uid}`); // Reference to the user data
    const snapshot = await get(userRef); // Get the snapshot from the database

    if (snapshot.exists()) {
      const userData = snapshot.val(); // Get user data from snapshot
      console.log("User data found:", userData); // Log the found user data
      return {
        uid,
        email: userData.email,
        firstName: userData.firstName || "", // Retrieve first name
        lastName: userData.lastName || "", // Retrieve last name
        blocked: userData.blocked || false, // Default to false if not set
        subscriptionStatus: !!userData.subscriptionStatus, // Ensure boolean value for subscriptionStatus
      };
    } else {
      console.error("No such user!"); // User data not found
      return {
        uid,
        email: null,
        firstName: "",
        lastName: "",
        blocked: false,
        subscriptionStatus: false, // Default to false if user does not exist
      };
    }
  } catch (error) {
    console.error("Error fetching user data: ", error); // Log the error
    return {
      uid,
      email: null,
      firstName: "",
      lastName: "",
      blocked: false,
      subscriptionStatus: false, // Handle errors and default to false
    };
  }
};
