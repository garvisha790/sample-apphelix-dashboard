import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-content">
        <div className="app-title">
          <h1>AppHelix</h1>
        </div>
        <div className="login-card">
          <div className="login-header">
            <h1>Login</h1>
            <p>Welcome back! Please login to your account.</p>
          </div>
          
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email" 
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter your password" 
                className="form-control"
              />
              <div className="forgot-password">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            </div>
            
            <div className="form-group">
              <button type="button" className="login-button">
                Login
              </button>
            </div>
            
            <div className="login-footer">
              <p>AppHelix Dashboard © 2025</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
