import React, { useState } from 'react';
import { auth } from '../Firebase';  // Import Firebase auth
import { sendPasswordResetEmail } from 'firebase/auth';  // Import password reset method
import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing

function PasswordRecovery() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');  // To handle error messages
  const [message, setMessage] = useState('');  // To show success message
  const navigate = useNavigate();  // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send password reset email using Firebase Auth
      await sendPasswordResetEmail(auth, email);
      setMessage('Password recovery instructions sent to your email!');
      setError('');  // Clear any previous errors
      setTimeout(() => {
        navigate('/login');  // Redirect to login page after success
      }, 2000);  // Redirect after 2 seconds
    } catch (error) {
      setError(error.message);  // Show error if something goes wrong
      setMessage('');  // Clear success message if there's an error
    }
  };

  return (
    <div style={styles.container}>
      <h2>Password Recovery</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>}  {/* Display error message */}
        {message && <p style={styles.success}>{message}</p>}  {/* Display success message */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send Instructions</button>
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
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
  },
  success: {
    color: 'green',
    marginBottom: '15px',
  },
};

export default PasswordRecovery;
