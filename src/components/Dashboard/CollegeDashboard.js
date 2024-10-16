import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CollegeDashboard.css'; // Import CSS for styling

const CollegeDashboard = () => {
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Check if the user is authenticated by checking for a token
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token is found, redirect to login page
      navigate('/');
    } else {
      // Prevent the user from going back to the login page after login
      window.history.pushState(null, null, window.location.href);
      window.addEventListener('popstate', () => {
        window.history.pushState(null, null, window.location.href);
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Allow going back to the Home page after logout
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="college-dashboard">
      <h2>College Dashboard</h2>
      <p>Welcome to your dashboard! Here you can manage your courses, view student progress, and more.</p>
      
      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      
      {/* Add more functionalities and components as needed */}
    </div>
  );
};

export default CollegeDashboard;
