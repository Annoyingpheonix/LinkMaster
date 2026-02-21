import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PostPlanner from './components/PostPlanner';
import ProfileOptimizer from './components/ProfileOptimizer';
import HookGenerator from './components/HookGenerator';
import AccountSettings from './components/AccountSettings';
import Login from './components/Login';
import { NavView } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setView] = useState<NavView>(NavView.DASHBOARD);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setView(NavView.DASHBOARD);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const renderView = () => {
    switch (currentView) {
      case NavView.DASHBOARD:
        return <Dashboard />;
      case NavView.PLANNER:
        return <PostPlanner />;
      case NavView.OPTIMIZER:
        return <ProfileOptimizer />;
      case NavView.HOOKS:
        return <HookGenerator />;
      case NavView.SETTINGS:
        return <AccountSettings />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout currentView={currentView} setView={setView} onLogout={handleLogout}>
      <div className="max-w-7xl mx-auto h-full">
        {renderView()}
      </div>
    </Layout>
  );
};

export default App;