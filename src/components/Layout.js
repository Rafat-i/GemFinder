// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet is used to render child routes

import SideNavBar from './SideNavBar';  // Import your Sidebar

const Layout = () => {
  return (
    <div className="layout-container">
      {/* Sidebar */}
      <SideNavBar />

      {/* Main content that will change based on route */}
      <div className="content-container">
        <Outlet /> {/* This renders the page content based on the current route */}
      </div>
    </div>
  );
};

export default Layout;
