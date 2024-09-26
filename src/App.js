import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SignUp from './components/SignUp';
import Login from './components/Login';
import PasswordRecovery from './components/PasswordRecovery';
import Home from './components/Home';
import AdminDashboard from './components/Admin/AdminDashboard';
import AddUser from './components/Admin/AddUser';
import UpdateUsers from './components/Admin/UpdateUsers';
import ViewUsers from './components/Admin/ViewUsers';
import RemoveUser from './components/Admin/RemoveUser';
import AdminRoute from './routes/AdminRoute';
import AuthStateListener from './components/AuthStateListener';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AuthStateListener />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recover-password" element={<PasswordRecovery />} />
          
          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminRoute element={<AdminDashboard />} />} />
          <Route path="/admin/add-user" element={<AdminRoute element={<AddUser />} />} />
          <Route path="/admin/update-user" element={<AdminRoute element={<UpdateUsers />} />} />
          <Route path="/admin/view-users" element={<AdminRoute element={<ViewUsers />} />} />
          <Route path="/admin/remove-user" element={<AdminRoute element={<RemoveUser />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
