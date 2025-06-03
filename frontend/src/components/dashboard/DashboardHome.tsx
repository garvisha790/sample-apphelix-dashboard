import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { KPICard } from './KPICard';
import { StatusChart } from './StatusChart';
import { ActivityFeed } from './ActivityFeed';
import { AtRiskTable } from './AtRiskTable';

const DashboardHome: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [customerCount, setCustomerCount] = useState(4);
  const [engagementCount, setEngagementCount] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleAddCustomer = () => {
    setCustomerCount(prev => prev + 1);
  };
  
  const handleAddEngagement = () => {
    setEngagementCount(prev => prev + 1);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const toggleNotifications = () => {
    setShowNotification(!showNotification);
  };
  
  const handleNewEngagement = () => {
    setEngagementCount(prev => prev + 1);
    // In a real implementation, this would open a form or modal
    alert('New engagement form would open here');
  };
  
  const handleViewActivity = () => {
    // In a real implementation, this would navigate to activity page
    alert('Navigating to full activity view');
  };
  
  const handleViewDeadlines = () => {
    // In a real implementation, this would navigate to deadlines page
    alert('Navigating to deadlines view');
  };
  
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };
  
  const handleLogout = () => {
    // Since we're keeping pages separate, just show an alert
    alert('Logout functionality would go here');
    // In a real app with connected pages, this would navigate to login
    console.log('User logged out');
  };
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="app-logo">AH</div>
          <div>
            <div className="app-title">AppHelix</div>
            <div className="online-status">Online</div>
          </div>
        </div>
        
        <nav>
          <a href="#" className="nav-item active">
            <span className="nav-item-icon">📊</span>
            Dashboard
          </a>
          <a href="#" className="nav-item">
            <span className="nav-item-icon">👥</span>
            Customers
          </a>
          <a href="#" className="nav-item">
            <span className="nav-item-icon">📝</span>
            Reports
          </a>
          <a href="#" className="nav-item">
            <span className="nav-item-icon">💰</span>
            Invoices
          </a>
          <a href="#" className="nav-item">
            <span className="nav-item-icon">⚙️</span>
            Settings
          </a>
        </nav>

        <div className="user-id">
          <div className="user-id-avatar">JD</div>
          <div className="user-id-info">
            <div className="user-id-name">John Doe</div>
            <div className="user-id-role">System Administrator</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="header-actions">
            <div className="search-bar">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={handleSearch}
              />
              <span className="search-icon">🔍</span>
            </div>
            <button className="new-engagement-btn" onClick={handleNewEngagement}>
              <span>+</span> New Engagement
            </button>
            <div className="notification-icon" onClick={toggleNotifications}>
              🔔
              <span className="notification-badge" style={{ display: showNotification ? 'block' : 'none' }}></span>
            </div>
            <div className="user-profile" onClick={toggleProfileMenu}>
              U
              <div className={`profile-dropdown ${showProfileMenu ? 'active' : ''}`}>
                <a href="#" className="profile-menu-item">Profile</a>
                <a href="#" className="profile-menu-item">Settings</a>
                <a href="#" className="profile-menu-item logout" onClick={handleLogout}>Logout</a>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-grid">
          {/* KPI Cards */}
          {isLoading ? (
            <div className="kpi-section loading-pulse">
              <div className="section-header">
                <span>Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="kpi-section">
                <div className="section-header">
                  <span>Total Customers</span>
                  <div className="add-icon" onClick={handleAddCustomer}>+</div>
                </div>
                <div className="kpi-value">{customerCount}</div>
              </div>
              
              <div className="kpi-section">
                <div className="section-header">
                  <span>Active Engagements</span>
                  <div className="add-icon" onClick={handleAddEngagement}>+</div>
                </div>
                <div className="kpi-value">{engagementCount}</div>
              </div>
            </>
          )}

          {/* Status Chart */}
          <div className="status-chart-section">
            <div className="section-header">
              <span>Engagement Status</span>
              <div className="add-icon">+</div>
            </div>
            <div className="chart-container">
              <div className="status-chart">
                {/* This would be replaced with an actual chart component */}
                <div className="status-label">Status</div>
              </div>
            </div>
            <div className="status-indicators">
              <div className="status-indicator">
                <div className="indicator-dot" style={{ backgroundColor: '#10b981' }}></div>
                <span className="indicator-label">Good</span>
                <span className="indicator-count">45 systems</span>
              </div>
              <div className="status-indicator">
                <div className="indicator-dot" style={{ backgroundColor: '#f59e0b' }}></div>
                <span className="indicator-label">Warning</span>
                <span className="indicator-count">30 systems</span>
              </div>
              <div className="status-indicator">
                <div className="indicator-dot" style={{ backgroundColor: '#ef4444' }}></div>
                <span className="indicator-label">Critical</span>
                <span className="indicator-count">25 systems</span>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="activity-section">
            <div className="activity-header">
              <div className="section-header">
                <span>Recent Activity</span>
              </div>
              <span className="view-all" onClick={handleViewActivity}>View all activity</span>
            </div>
            
            <div className="activity-item">
              <div className="user-avatar" style={{ backgroundColor: '#ec4899' }}>SJ</div>
              <div className="activity-content">
                <div className="activity-text">
                  Sarah Johnson added a new report to <span className="company-name">Acme Corp</span>: Cloud Migration
                </div>
                <div className="activity-time">2 hours ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="user-avatar" style={{ backgroundColor: '#3b82f6' }}>DK</div>
              <div className="activity-content">
                <div className="activity-text">
                  David Kim updated status for <span className="company-name">TechStart</span>: CRM implementation to Yellow
                </div>
                <div className="activity-time">2 hours ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="user-avatar" style={{ backgroundColor: '#f59e0b' }}>AL</div>
              <div className="activity-content">
                <div className="activity-text">
                  Amanda Lee added a new stakeholder to <span className="company-name">Security Audit</span>
                </div>
                <div className="activity-time">2 hours ago</div>
              </div>
            </div>
          </div>

          {/* Deadlines */}
          <div className="deadlines-section">
            <div className="activity-header">
              <div className="section-header">
                <span>Upcoming Deadlines</span>
              </div>
              <span className="view-all" onClick={handleViewDeadlines}>View all deadlines</span>
            </div>
            
            <div className="deadline-item">Quarterly Reporting Submission - Due Tomorrow</div>
            <div className="deadline-item">MSA Renewal</div>
            <div className="deadline-item">Project Kickoff: Phase 2 Completion</div>
            <div className="deadline-item">Stakeholder Review Meeting</div>
          </div>

          {/* At-Risk Engagements */}
          <div className="at-risk-section">
            <div className="section-header">
              <span>At-Risk Engagements</span>
            </div>
            
            <table className="risk-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Engagement</th>
                  <th>Type</th>
                  <th>Owner</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Global Bank Ltd</td>
                  <td>Assessment</td>
                  <td className="risk-high">High</td>
                  <td>Jane Doe</td>
                  <td className="table-actions">View</td>
                </tr>
                <tr>
                  <td>Acme Corp</td>
                  <td>Consultation</td>
                  <td className="risk-medium">Medium</td>
                  <td>John Smith</td>
                  <td className="table-actions">View</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;
