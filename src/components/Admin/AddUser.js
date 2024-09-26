import React, { useState } from 'react';
import { database } from '../../Firebase'; // Correct import for the database
import { ref, push } from 'firebase/database'; // Import ref and push from firebase/database
import './AddUser.css';

const AddUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate inputs
        if (!firstName || !lastName || !email || !password) {
            setError('All fields are required.');
            return;
        }

        try {
            // Sign up the user via Firebase REST API
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQ7pxrOXCsj6hpc_dCWPA40-qNBgAtQ18`, { // Use your actual API key
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error.message);
            }

            // Add user details to Firebase Realtime Database
            await push(ref(database, 'users'), {
                firstName: firstName,
                lastName: lastName,
                email: email,
                uid: data.localId // Store the UID from Firebase Auth
            });

            // Reset form fields and show success message
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setError(''); // Clear error if successful
            setSuccessMessage('User added successfully!');
        } catch (error) {
            console.error('Error adding user:', error);
            setError('Failed to add user. Please try again.');
        }
    };

    return (
        <div className="add-user-container">
            <h2>Add New User</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Add User</button>
            </form>
        </div>
    );
};

export default AddUser;
