import React, { useState, useEffect } from 'react';
import './Settings.css';
import ExitToMenuButton from '../../components/ExitToMenuButton/ExitToMenuButton';
import { FaMoon, FaBell, FaPlayCircle, FaTrashAlt } from 'react-icons/fa';

function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedDark = localStorage.getItem('tamilbuzz_dark_mode');
    if (savedDark !== null) setDarkMode(savedDark === 'true');
    
    const savedNotif = localStorage.getItem('tamilbuzz_notifications');
    if (savedNotif !== null) setNotifications(savedNotif === 'true');
    
    const savedAuto = localStorage.getItem('tamilbuzz_autoplay');
    if (savedAuto !== null) setAutoplay(savedAuto === 'true');
  }, []);

  const handleDarkModeToggle = () => {
    const newVal = !darkMode;
    setDarkMode(newVal);
    localStorage.setItem('tamilbuzz_dark_mode', newVal);
    if (newVal) {
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
    }
  };

  const handleNotificationsToggle = () => {
    const newVal = !notifications;
    setNotifications(newVal);
    localStorage.setItem('tamilbuzz_notifications', newVal);
  };

  const handleAutoplayToggle = () => {
    const newVal = !autoplay;
    setAutoplay(newVal);
    localStorage.setItem('tamilbuzz_autoplay', newVal);
  };

  const handleClearCache = () => {
      alert("App cache has been cleared successfully.");
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
         <ExitToMenuButton />
         <h1>Settings</h1>
      </div>
      
      <div className="settings-content">
        <div className="settings-section">
          <h2>Preferences</h2>
          
          <div className="setting-item" onClick={handleDarkModeToggle}>
            <div className="setting-info">
              <FaMoon className="setting-icon" />
              <div>
                <h3>Dark Mode</h3>
                <p>Toggle dark or light theme</p>
              </div>
            </div>
            <div className={`toggle-switch ${darkMode ? 'active' : ''}`}>
              <div className="toggle-knob"></div>
            </div>
          </div>

          <div className="setting-item" onClick={handleNotificationsToggle}>
            <div className="setting-info">
              <FaBell className="setting-icon" />
              <div>
                <h3>Email Notifications</h3>
                <p>Receive updates about new movies</p>
              </div>
            </div>
            <div className={`toggle-switch ${notifications ? 'active' : ''}`}>
              <div className="toggle-knob"></div>
            </div>
          </div>

          <div className="setting-item" onClick={handleAutoplayToggle}>
            <div className="setting-info">
              <FaPlayCircle className="setting-icon" />
              <div>
                <h3>Autoplay Trailers</h3>
                <p>Automatically play video trailers</p>
              </div>
            </div>
            <div className={`toggle-switch ${autoplay ? 'active' : ''}`}>
              <div className="toggle-knob"></div>
            </div>
          </div>
        </div>

        <div className="settings-section">
            <h2>Data & Storage</h2>
            <div className="setting-item action-item" onClick={handleClearCache}>
                <div className="setting-info text-danger">
                    <FaTrashAlt className="setting-icon" />
                    <div>
                        <h3>Clear App Cache</h3>
                        <p>Free up local storage space and reset temporary data</p>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}

export default Settings;
