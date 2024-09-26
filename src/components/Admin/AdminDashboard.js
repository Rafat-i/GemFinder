import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // Make sure to import the CSS file

function AdminDashboard() {
  return (
    <div className="container">
      <h1 className="title">Administrator Dashboard</h1>
      <div className="nav">
        <div className="button-row">
          <Link to="/admin/add-user" className="button">
            <span>👤</span> Add User
          </Link>
          <Link to="/admin/update-user" className="button">
            <span>✏️</span> Update User
          </Link>
        </div>
        <div className="button-row">
          <Link to="/admin/view-users" className="button">
            <span>📋</span> View Users
          </Link>
          <Link to="/admin/remove-user" className="button">
            <span>❌</span> Remove User
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
