import React from 'react';
import { Link } from 'react-router-dom';
import './ForgotPasswordPage.css';

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-content">
        <div className="app-title">
          <h1>AppHelix</h1>
        </div>
        <div className="forgot-password-card">
          <div className="forgot-password-header">
            <h1>Reset Password</h1>
            <p>Reset your password</p>
          </div>
          
          <form className="forgot-password-form">
            <div className="forgot-password-message">
              <p>Enter your email address below and we'll send you a link to reset your password.</p>
            </div>
            
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
              <button type="button" className="reset-button">
                Send Reset Link
              </button>
            </div>
            
            <div className="forgot-password-footer">
              <p>Remember your password? <Link to="/login">Back to login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
