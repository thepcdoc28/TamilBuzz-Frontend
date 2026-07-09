import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTimes, FaFilm, FaHeart, FaUser, FaEnvelope, FaShieldAlt, FaFileContract, FaCog, FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      {/* Overlay to close sidebar when clicking outside */}
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
      
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>

        <div className="sidebar-content">
          <div className="sidebar-section">
            <h3>User Features</h3>
            <NavLink to="/watchlist" className="sidebar-link" onClick={toggleSidebar}>
              <FaFilm className="sidebar-icon" /> My Watchlist
            </NavLink>
            <NavLink to="/favorites" className="sidebar-link" onClick={toggleSidebar}>
              <FaHeart className="sidebar-icon" /> Favorites
            </NavLink>
            <NavLink to="/profile" className="sidebar-link" onClick={toggleSidebar}>
              <FaUser className="sidebar-icon" /> Account Profile
            </NavLink>
          </div>

          <div className="sidebar-section">
            <h3>App Info & Settings</h3>
            <NavLink to="/settings" className="sidebar-link" onClick={toggleSidebar}>
              <FaCog className="sidebar-icon" /> Settings
            </NavLink>
            <NavLink to="/about" className="sidebar-link" onClick={toggleSidebar}>
              <FaInfoCircle className="sidebar-icon" /> About Us
            </NavLink>
            <NavLink to="/faq" className="sidebar-link" onClick={toggleSidebar}>
              <FaQuestionCircle className="sidebar-icon" /> FAQ
            </NavLink>
            <NavLink to="/contact" className="sidebar-link" onClick={toggleSidebar}>
              <FaEnvelope className="sidebar-icon" /> Contact Us
            </NavLink>
            <NavLink to="/privacy" className="sidebar-link" onClick={toggleSidebar}>
              <FaShieldAlt className="sidebar-icon" /> Privacy Policy
            </NavLink>
            <NavLink to="/terms" className="sidebar-link" onClick={toggleSidebar}>
              <FaFileContract className="sidebar-icon" /> Terms of Service
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
