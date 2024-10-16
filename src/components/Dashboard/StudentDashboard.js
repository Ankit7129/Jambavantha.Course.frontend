import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css'; // Import CSS for styling

const StudentDashboard = () => {
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Check if the user is authenticated by checking for a token
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token is found, redirect to login page
      navigate('/login/student');
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
    // Redirect to student Home page after logout
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, Student!</h1>
      
      <div className="user-info">
        <h2>Your Information</h2>
        <p>Name: [Student Name]</p>
        <p>Email: [Student Email]</p>
        <p>Phone Number: [Student Phone]</p>
        <p>Educational Background: [Background]</p>
      </div>

      <div className="button-group">
        <button onClick={() => navigate('/courses')}>View Courses</button>
        <button onClick={() => navigate('/update-profile')}>Update Profile</button>
        <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      </div>

      {/* Bubbles for floating animation */}
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
    </div>
  );
};

export default StudentDashboard;
