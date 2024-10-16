// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Shared/Header';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgetPassword';
import ResetPassword from './components/Auth/ResetPassword';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import CollegeDashboard from './components/Dashboard/CollegeDashboard';
import HomePage from './components/HomePage'; // Import the HomePage component
import VerifyEmail from './components/Auth/VerifyEmail'; // Import the new component

const App = () => {
  return (
    <Router>
      {/* Render Header only if not on the dashboard routes */}
      {!window.location.pathname.includes('/dashboard/') && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Updated to use HomePage */}
        <Route path="/login/student" element={<Login userType="student" />} />
        <Route path="/login/college" element={<Login userType="college" />} />
        <Route path="/register/student" element={<Register userType="student" />} />
        <Route path="/register/college" element={<Register userType="college" />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} /> {/* Add this route */}
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/college" element={<CollegeDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
