// src/AppRouter.tsx

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
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorPage from './pages/Error';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path={AppRouteEnum.Auth} element={<Auth />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected area */}
        <Route
          path={AppRouteEnum.Home}
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path={AppRouteEnum.Settings} element={<Settings />} />
          <Route path={AppRouteEnum.Dashboard} element={<Dashboard />} />
          <Route path={AppRouteEnum.Profile} element={<Profile />} />
          <Route path={AppRouteEnum.Error} element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
