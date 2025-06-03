import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage.tsx';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage.tsx';
import DashboardHome from './components/dashboard/DashboardHome.tsx';
import './App.css';

const App: React.FC = () => {

  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
};

export default App;
