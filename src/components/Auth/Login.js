import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Importing the CSS file
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const Login = ({ userType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [errorMessage, setErrorMessage] = useState(''); // To handle error messages

  const handleLogin = async (e) => {
    e.preventDefault();

    // API endpoint based on the userType (student or college)
    const apiUrl = userType === 'student' 
    ? `${BASE_URL}/api/students/login` // Correct interpolation with backticks
    : `${BASE_URL}/api/colleges/login`; // Also use BASE_URL for college login for consistency
  

    try {
      // Sending request to appropriate login endpoint
      const response = await axios.post(apiUrl, {
        adminEmail: email, email,
        password,
      });

      console.log(response.data); // Handle successful login here

      // Store token or any other data you might need
      localStorage.setItem('token', response.data.token);

      // Redirect to the appropriate dashboard
      if (userType === 'student') {
        navigate('/dashboard/student');
      } else {
        navigate('/dashboard/college');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message); // Show specific error message from backend
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      {/* Bubble Animation Background */}
      {/* Bubbles for floating animation */}
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>

      <h2>{userType === 'student' ? 'Student' : 'College'} Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* Display error message if there is one */}
      {errorMessage && <p>{errorMessage}</p>}

      {/* Forget Password and New User Registration buttons */}
      <div className="button-group" style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/forget-password')}>Forgot Password?</button>
        <button onClick={() => navigate(`/register/${userType}`)}>
          New User? Register Here
        </button>

        {/* Redirect to home page button */}
        <button onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Login;
