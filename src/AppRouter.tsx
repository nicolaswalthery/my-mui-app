import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import { AppRouteEnum } from './enums/AppRouteEnum';

// Pages
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Auth from './pages/Auth';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={AppRouteEnum.Home} element={<App />}>
          <Route index element={<Home />} />
          <Route path={AppRouteEnum.Settings} element={<Settings />} />
          <Route path={AppRouteEnum.Dashboard} element={<Dashboard />} />
          <Route path={AppRouteEnum.Profile} element={<Profile />} />
          <Route path={AppRouteEnum.Auth} element={<Auth />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;