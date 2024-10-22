import React, { useEffect, useState } from 'react';
import { database } from '../../Firebase'; // Use Realtime Database
import { ref, onValue, update } from 'firebase/database'; // Import ref, onValue, and update from firebase/database
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

    const handleBlockUser = (userId, isBlocked) => {
        const userRef = ref(database, `users/${userId}`);
        update(userRef, { blocked: !isBlocked }) // Toggle the blocked status
            .then(() => {
                console.log(`User with ID ${userId} is now ${isBlocked ? 'unblocked' : 'blocked'}.`);
            })
            .catch((error) => {
                console.error("Error updating user status: ", error);
            });
    };

    return (
        <div className="view-users-container">
            <h2>View Users</h2>
            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id} className="user-item">
                        {user.firstName} {user.lastName} {/* Adjust to match your user data */}
                        <button
                            className={`block-button ${user.blocked ? 'unblock' : 'block'}`}
                            onClick={() => handleBlockUser(user.id, user.blocked)}
                        >
                            {user.blocked ? 'Unblock' : 'Block'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewUsers;
