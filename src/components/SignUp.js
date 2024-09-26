import React, { useState } from 'react';
import { auth, database } from '../Firebase'; // Ensure you're importing database correctly
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, push } from 'firebase/database'; // Import ref and push from Firebase Realtime Database

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To handle error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sign up the user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user information to Realtime Database
      await push(ref(database, 'users'), { // Push user data to 'users' node
        uid: user.uid, // Store the UID from Firebase Auth
        firstName,
        lastName,
        email
      });

      alert('Sign Up Successful! Redirecting to the home page...');
      window.location.href = 'http://localhost:3000/'; // Redirect to the desired URL
    } catch (error) {
      setError(error.message); // Show error if sign-up fails
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>} {/* Display error message */}
        
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
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
};

export default SignUp;
