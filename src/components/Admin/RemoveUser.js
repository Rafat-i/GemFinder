import React, { useState, useEffect } from 'react';
import { database } from '../../Firebase'; // Adjust the import based on your Firebase setup
import { ref, remove, onValue } from 'firebase/database'; // Import required functions from Firebase Realtime Database
import './RemoveUser.css';

const RemoveUser = () => {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState('');
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

    const handleRemoveUser = async (e) => {
        e.preventDefault();
        if (!userId) {
            setError('Please enter a user ID');
            return;
        }

        try {
            const userRef = ref(database, `users/${userId}`);
            await remove(userRef); // Remove user from the database
            setError('');
            alert(`User with ID ${userId} removed!`);
            setUserId(''); // Reset input
        } catch (err) {
            setError('Failed to remove user.');
            console.error(err);
        }
    };

    return (
        <div className="remove-user-container">
            <h2>Remove User</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleRemoveUser}>
                <div className="form-group">
                    <label htmlFor="user-select">Select User:</label>
                    <select
                        id="user-select"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    >
                        <option value="">--Select User--</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.firstName} {user.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="submit-button">Remove User</button>
            </form>
        </div>
    );
};

export default RemoveUser;
