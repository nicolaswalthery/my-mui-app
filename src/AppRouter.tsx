// src/AppRouter.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import { AppRouteEnum } from './enums/AppRouteEnum';

// Pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorPage from './pages/Error';
import MailAutomationForm from './pages/MailAutomationForm';

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
          <Route path={AppRouteEnum.Profile} element={<Profile />} />
          <Route path={AppRouteEnum.Error} element={<ErrorPage />} />
          <Route path={AppRouteEnum.EditProfile} element={<EditProfile />} />
          <Route path={AppRouteEnum.MailAutoOnboarding} element={<MailAutomationForm />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
