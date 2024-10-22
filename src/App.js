import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SignUp from './components/SignUp';
import Login from './components/Login';
import PasswordRecovery from './components/PasswordRecovery';
import Home from './components/Home';
import PaymentPage from './components/PaymentPage'; // Import your PaymentPage component
import Success from './components/Success'; // Import your Success component
import Cancel from './components/Cancel'; // Import your Cancel component
import AdminDashboard from './components/Admin/AdminDashboard';
import AddUser from './components/Admin/AddUser';
import UpdateUsers from './components/Admin/UpdateUsers';
import ViewUsers from './components/Admin/ViewUsers';
import RemoveUser from './components/Admin/RemoveUser';
import AdminRoute from './routes/AdminRoute';
import AuthStateListener from './components/AuthStateListener';
import { AuthProvider } from './context/AuthContext';
import ProfileEdit from './components/ProfileEdit'; // Import the ProfileEdit component

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
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path="/edit-profile" element={<ProfileEdit />} /> {/* Route for editing profile */}

          {/* Payment Routes */}
          <Route path="/payment" element={<PaymentPage />} /> {/* Main payment page */}
          <Route path="/success" element={<Success />} /> {/* Success page */}
          <Route path="/cancel" element={<Cancel />} /> {/* Cancel page */}

          {/* Admin Routes */}
          <Route element={<AdminRoute />}> {/* Wrap admin routes with AdminRoute for protection */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add-user" element={<AddUser />} />
            <Route path="/admin/update-user" element={<UpdateUsers />} />
            <Route path="/admin/view-users" element={<ViewUsers />} />
            <Route path="/admin/remove-user" element={<RemoveUser />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
