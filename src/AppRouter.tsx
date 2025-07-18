import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import { AppRouteEnum } from './enums/AppRouteEnum';

// Pages
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Settings from './pages/Settings';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={AppRouteEnum.Dashboard} element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path={AppRouteEnum.Home} element={<Home />} />
          <Route path={AppRouteEnum.Settings} element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;