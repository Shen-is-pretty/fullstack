import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import './Logout.css';

const Logout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  // Toggle modal visibility
  const handleLogout = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Confirm logout action
  const confirmLogout = () => {
    // Perform logout actions
    localStorage.removeItem('token'); // Remove token or user data
    alert('You have logged out successfully.');
    setIsModalOpen(false);
    navigate('/login'); // Redirect to login page
  };

  // Cancel logout action
  const cancelLogout = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <div>
      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        Log Out
      </button>

      {/* Modal Overlay */}
      <div className={`modal-overlay ${isModalOpen ? 'show' : ''}`}>
        <div className="modal-content">
          <h2>Are you sure you want to log out?</h2>
          <div className="modal-buttons">
            <button className="modal-btn confirm-btn" onClick={confirmLogout}>
              Yes
            </button>
            <button className="modal-btn cancel-btn" onClick={cancelLogout}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
