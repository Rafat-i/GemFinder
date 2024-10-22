import React, { useState, useEffect } from 'react';
import { auth, database } from '../Firebase'; // Ensure you have the correct imports
import { ref, get, set } from 'firebase/database'; // Import necessary functions from Firebase
import { updateEmail, updatePassword } from 'firebase/auth'; // Import functions for updating email and password

function ProfileEdit() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailChangePending, setEmailChangePending] = useState(false); // Track if email change is pending

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setEmail(userData.email);
        } else {
          console.error("No user data found!");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    try {
      // Fetch current user data
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);
      let currentUserData;

      if (snapshot.exists()) {
        currentUserData = snapshot.val();
      } else {
        throw new Error("User data does not exist.");
      }

      // Check if the email has changed
      if (email !== user.email) {
        // Update user's email and send a verification email
        await updateEmail(user, email);
        await user.sendEmailVerification(); // Send a verification email
        setEmailChangePending(true); // Set pending state for email change
        setSuccess('Verification email sent. Please verify your new email address.');
      }

      // Update user's password if provided
      if (password) {
        await updatePassword(user, password);
      }

      // Prepare the updated user data
      const updatedUserData = {
        firstName,
        lastName,
        email,
        blocked: currentUserData.blocked, // Preserve the blocked field
      };

      // Update additional user information in the Realtime Database
      await set(userRef, updatedUserData);

      // Show success message
      setSuccess('Profile updated successfully!');
      setError(''); // Clear any previous error messages
    } catch (err) {
      setError(err.message);
      setSuccess(''); // Clear any previous success messages
    }
  };

  return (
    <div style={styles.container}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="New Password (leave blank to keep current password)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        
        <button type="submit" style={styles.button}>Update Profile</button>
      </form>
      {emailChangePending && (
        <p style={styles.info}>
          Please check your email to verify your new address.
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '300px',
    margin: '50px auto',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
  },
  success: {
    color: 'green',
    marginBottom: '15px',
  },
  info: {
    color: 'blue',
    marginTop: '10px',
  },
};

export default ProfileEdit;
