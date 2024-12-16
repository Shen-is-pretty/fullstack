import React from 'react'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';
import Dashboard from './Dashboard'; // Your Dashboard component
import Register from './Register'; // Your Register component
import LoginBox from './LoginBox'; // Your LoginBox component
import Ledger from './Ledger'; // Your Ledger component


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Directly check existence
  if (!token) {
    // Redirect to login if no token exists
    return <Navigate to="/login" replace />;
  }
  return children; // Render protected route if token exists
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginbox" element={<LoginBox />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/ledger" element={<Ledger />} />
       
     

        {/* Protect the dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Optionally, you can render the LoginBox component here */}
        <Route
          path="/login-box"
          element={
            <div>
              <LoginBox />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
