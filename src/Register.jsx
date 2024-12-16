import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const API_ENDPOINT = "https://shensalcedo-gmw1.onrender.com/api"; // Replace with your backend URL

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages
    setSuccess(''); // Clear any previous success messages

    // Basic password validation (at least 10 characters)
    if (password.length < 10) {
      setError('Password must be at least 10 characters');
      return;
    }

    try {
      // Make the POST request to your backend register endpoint
      const response = await axios.post(`${API_ENDPOINT}/auth/register`, {
        firstname: firstName,
        lastname: lastName,
        username,
        passwords: password// Corrected to use "password" here
      });

      // Show success message
      setSuccess('Account created successfully! Redirecting to login...');

      // Redirect to the login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      // If there is an error, show the error message
      const backendError = err.response?.data?.message || 'Failed to create an account. Please try again.';
      setError(backendError); // Display error from the backend
      console.error(err); // Log the error for debugging purposes
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="title">Find Your Own Style</h1>
        <h2 className="subtitle">Register now and unleash your creativity!</h2>

        <form onSubmit={handleSubmit} className="register-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="input-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="Enter your first name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Enter your last name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Choose your username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Choose a password"
            />
          </div>

          <button type="submit" className="register-btn">Register</button>
        </form>

        <div className="links">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
