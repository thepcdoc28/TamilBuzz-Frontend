import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './ExitToMenuButton.css';

function ExitToMenuButton() {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/', { state: { openSidebar: true } });
  };

  return (
    <button className="exit-menu-btn" onClick={handleExit}>
      <FaArrowLeft /> Back to Menu
    </button>
  );
}

export default ExitToMenuButton;
