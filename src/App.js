import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import SignUp from './components/SignUp';
import Login from './components/Login';
import PasswordRecovery from './components/PasswordRecovery';
import Home from './components/Home';
import PaymentPage from './components/PaymentPage';
import Success from './components/Success';
import Cancel from './components/Cancel';
import AdminDashboard from './components/Admin/AdminDashboard';
import AddUser from './components/Admin/AddUser';
import UpdateUsers from './components/Admin/UpdateUsers';
import ViewUsers from './components/Admin/ViewUsers';
import RemoveUser from './components/Admin/RemoveUser';
import AdminRoute from './routes/AdminRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import AuthStateListener from './components/AuthStateListener';
import { AuthProvider } from './context/AuthContext';
import ProfileEdit from './components/ProfileEdit';
import ContactSupport from './components/ContactSupport';
import About from './components/About';
import Layout from './components/Layout';
import AiCoins from './components/AiCoins';
import GamingCoins from './components/GamingCoins';
import RwaCoins from './components/RwaCoins';
import SuccessStories from './components/SuccessStories';

// Helper component to manage the "fixed-header" class
function FixedHeaderManager() {
  const location = useLocation();

  useEffect(() => {
    const pagesWithFixedHeader = [
      '/about',
      '/ai-coins',
      '/gaming-coins',
      '/rwa-coins',
      '/success-stories',
    ];

    if (pagesWithFixedHeader.includes(location.pathname)) {
      document.body.classList.add('fixed-header');
    } else {
      document.body.classList.remove('fixed-header');
    }
  }, [location]);

  return null; // This component doesn't render anything
}

function App() {
  return (
    <AuthProvider>
      <AuthStateListener />
      <Router>
        {/* FixedHeaderManager ensures the class is toggled dynamically */}
        <FixedHeaderManager />
        <Header />
        <Routes>
          {/* Layout Routes */}
          <Route element={<Layout />}>
            <Route path="/about" element={<About />} />
            <Route path="/ai-coins" element={<AiCoins />} />
            <Route path="/gaming-coins" element={<GamingCoins />} />
            <Route path="/rwa-coins" element={<RwaCoins />} />
            <Route path="/success-stories" element={<SuccessStories />} />
          </Route>

          {/* General Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path="/edit-profile" element={<ProfileEdit />} />
          <Route path="/contact-support" element={<ContactSupport />} />

          {/* Payment Routes */}
          <Route 
            path="/payment" 
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />

          {/* Admin Routes */}
          <Route element={<AdminRoute />}> 
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
