import React, { useEffect, useState } from 'react';
import { database } from '../../Firebase'; // Use Realtime Database
import { ref, onValue } from 'firebase/database'; // Import ref and onValue from firebase/database
import './ViewUsers.css';

const ViewUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = () => {
            const usersRef = ref(database, 'users'); // Reference to the users node in Realtime Database
            onValue(usersRef, (snapshot) => {
                const usersList = [];
                snapshot.forEach((childSnapshot) => {
                    const userData = childSnapshot.val();
                    usersList.push({ id: childSnapshot.key, ...userData }); // Include user ID and data
                });
                setUsers(usersList);
            }, (error) => {
                console.error("Error fetching users: ", error);
            });
        };

        fetchUsers();
    }, []);

    const handleRemoveUser = (userId) => {
        // Implement removal logic here
        console.log("Remove user with ID:", userId);
    };

    return (
        <div className="view-users-container">
            <h2>View Users</h2>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id} className="user-item">
                        {user.firstName} {user.lastName} {/* Adjust the property to match your user data */}
                        <button className="remove-button" onClick={() => handleRemoveUser(user.id)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewUsers;
