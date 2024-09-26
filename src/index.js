import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Assuming your main app component is in App.js
import './index.css'; // If you have global CSS
import { AuthProvider } from './context/AuthContext'; // Ensure AuthContext is imported

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap your App in AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
