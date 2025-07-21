import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserStorageManager } from '../helpers/userStorageManager';
import { AppRouteEnum } from '../enums/AppRouteEnum';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = UserStorageManager.isLoggedIn();

  if (!isLoggedIn) {
    // Redirect unauthenticated users to /auth, but save current location
    return <Navigate to={AppRouteEnum.Auth} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
