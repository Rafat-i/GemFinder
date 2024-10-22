import { useEffect } from 'react';
import { auth, database } from '../Firebase'; // Ensure you import the database
import { useAuth } from '../context/AuthContext';
import { ref, get } from 'firebase/database'; // Import necessary functions


const AuthStateListener = () => {
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Fetch user data including blocked status
          const userData = await fetchUserData(user.uid);
          setCurrentUser(userData);
          if (userData.blocked) {
            console.log("Your account is temporarily blocked. Please contact support."); // Blocked user message
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, [setCurrentUser]);

  return null;
};

export default AuthStateListener;

// Function to fetch user data from Realtime Database
const fetchUserData = async (uid) => {
  try {
    const userRef = ref(database, `users/${uid}`); // Reference to the user data
    const snapshot = await get(userRef); // Get the snapshot from the database

    if (snapshot.exists()) {
      const userData = snapshot.val(); // Get user data from snapshot
      return {
        uid,
        email: userData.email,
        firstName: userData.firstName || "", // Retrieve first name
        lastName: userData.lastName || "", // Retrieve last name
        blocked: userData.blocked || false, // Default to false if not set
      };
    } else {
      console.error("No such user!"); // User data not found
      return { uid, email: null, firstName: "", lastName: "", blocked: false }; // Default object if user does not exist
    }
  } catch (error) {
    console.error("Error fetching user data: ", error); // Log the error
    return { uid, email: null, firstName: "", lastName: "", blocked: false }; // Handle errors
  }
};
