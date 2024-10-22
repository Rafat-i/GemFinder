import React, { useState } from 'react';
import { auth, database } from '../Firebase'; // Import database for Realtime Database
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get } from 'firebase/database'; // Import 'get' to fetch user data from the database
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false); // Toggle for admin login
  const [error, setError] = useState('');

  const { setCurrentUser } = useAuth(); // Access setCurrentUser from AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Admin login with predefined credentials
    if (isAdminLogin) {
      if (email === 'rafat@gmail.com' && password === '123456') {
        alert('Admin Login Successful!');
        setCurrentUser({ email }); // Set the current user for admin
        navigate('/admin-dashboard'); // Redirect to admin dashboard
      } else {
        setError('Invalid admin credentials');
      }
      return;
    }

    // Regular user login
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the user is blocked in the Realtime Database
      const userRef = ref(database, `users/${user.uid}`);
      console.log('Checking if user is blocked'); // Debugging log
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log('User data:', userData); // Debugging log
        if (userData.blocked) {
          console.log('User is blocked'); // Debugging log
          setError('Your account is temporarily blocked. Please contact support.');
          return; // Exit early if the user is blocked
        }
      } else {
        console.log('No data found for this user.'); // Debugging log
      }

      // Proceed with login if not blocked
      setCurrentUser(user); // Set currentUser after successful login
      alert('Login Successful!');
      navigate('/'); // Redirect to the home page
    } catch (error) {
      console.error('Login error:', error); // Log the error for debugging
      setError(error.message); // Display error message
    }
  };

  return (
    <div style={styles.container}>
      <h2>{isAdminLogin ? 'Admin Login' : 'User Login'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>}
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
        <button type="submit" style={styles.button}>
          {isAdminLogin ? 'Login as Admin' : 'Login as User'}
        </button>
      </form>

      {/* Forgot Password link */}
      <p style={styles.forgotPassword}>
        <a href="/password-recovery" style={styles.forgotLink}>Forgot Password?</a>
      </p>

      {/* Stylish Toggle for admin or user login */}
      <div style={styles.toggleContainer}>
        <label style={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={isAdminLogin}
            onChange={() => setIsAdminLogin(!isAdminLogin)}
            style={styles.toggleInput}
          />
          <span style={styles.toggleSwitch}>
            <span
              style={{
                ...styles.toggleBall,
                transform: isAdminLogin ? 'translateX(26px)' : 'translateX(0)',
              }}
            ></span>
          </span>
          <span style={styles.toggleText}>
            {isAdminLogin ? 'Switch to User Login' : 'Switch to Admin Login'}
          </span>
        </label>
      </div>
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
  forgotPassword: {
    marginTop: '10px',
    textAlign: 'center',
  },
  forgotLink: {
    color: '#007BFF',
    textDecoration: 'none',
    fontSize: '14px',
    cursor: 'pointer',
  },
  toggleContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleLabel: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
  },
  toggleInput: {
    display: 'none',
  },
  toggleSwitch: {
    width: '50px',
    height: '24px',
    backgroundColor: '#007BFF',
    borderRadius: '50px',
    position: 'relative',
    transition: 'background-color 0.2s',
    marginRight: '10px',
  },
  toggleBall: {
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: '20px',
    height: '20px',
    backgroundColor: 'white',
    borderRadius: '50%',
    transition: 'transform 0.2s',
  },
  toggleText: {
    fontSize: '14px',
    color: '#333',
  },
};

export default Login;
