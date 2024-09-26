import React, { useState, useEffect } from 'react';
import { database } from '../../Firebase'; // Adjust the import based on your Firebase setup
import { ref, onValue, update } from 'firebase/database'; // Import required functions from Firebase Realtime Database
import './UpdateUsers.css';

const UpdateUsers = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = () => {
            const usersRef = ref(database, 'users'); // Reference to the 'users' node in Realtime Database
            onValue(usersRef, (snapshot) => {
                const usersData = snapshot.val();
                if (usersData) {
                    const usersList = Object.keys(usersData).map((key) => ({
                        id: key,
                        ...usersData[key],
                    }));
                    setUsers(usersList);
                } else {
                    setUsers([]); // Set users to an empty array if no users exist
                }
            }, (error) => {
                console.error("Error fetching users: ", error);
            });
        };

        fetchUsers();
    }, []);

    const handleUpdate = async () => {
        if (!selectedUserId || (!newFirstName && !newLastName && !newEmail)) {
            setError('Please select a user and enter at least one field to update.');
            return;
        }
        try {
            const userRef = ref(database, `users/${selectedUserId}`);
            const updates = {};
            if (newFirstName) updates.firstName = newFirstName; // Update first name if provided
            if (newLastName) updates.lastName = newLastName; // Update last name if provided
            if (newEmail) updates.email = newEmail; // Update email if provided
            await update(userRef, updates);
            setNewFirstName('');
            setNewLastName('');
            setNewEmail('');
            setError('');
            alert('User updated successfully!');
        } catch (err) {
            setError('Failed to update user.');
            console.error(err);
        }
    };

    return (
        <div className="update-user-container">
            <h2>Update User</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
                <label htmlFor="user-select">Select User:</label>
                <select
                    id="user-select"
                    value={selectedUserId}
                    onChange={e => setSelectedUserId(e.target.value)}
                >
                    <option value="">--Select User--</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.firstName} {user.lastName}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="new-first-name">New First Name:</label>
                <input
                    type="text"
                    id="new-first-name"
                    value={newFirstName}
                    onChange={e => setNewFirstName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="new-last-name">New Last Name:</label>
                <input
                    type="text"
                    id="new-last-name"
                    value={newLastName}
                    onChange={e => setNewLastName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="new-email">New Email:</label>
                <input
                    type="email"
                    id="new-email"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                />
            </div>
            <button className="submit-button" onClick={handleUpdate}>Update User</button>
        </div>
    );
};

export default UpdateUsers;
