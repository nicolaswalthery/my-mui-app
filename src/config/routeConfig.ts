import {
  Dashboard,
  Home,
  Settings,
  People
} from '@mui/icons-material';
import type { RouteConfig } from '../types/RouteConfig';

// Pages
import DashboardPage from '../pages/Dashboard';
import HomePage from '../pages/Home';
import AuthPage from '../pages/Settings';

export const routeConfig: RouteConfig[] = [
  {
    path: '/',
    displayName: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
    showInMenu: true,
    requiresAuth: false,
    description: 'Main dashboard with overview',
    order: 2,
  },
  {
    path: '/home',
    displayName: 'Home',
    icon: Home,
    component: HomePage,
    showInMenu: true,
    requiresAuth: false,
    description: 'Welcome page with features',
    order: 1,
  },
  {
    path: '/settings',
    displayName: 'Settings',
    icon: Settings,
    component: AuthPage,
    showInMenu: true,
    requiresAuth: false,
    description: 'Application settings and preferences',
    order: 3,
    badge: 'New', // Example badge
  },
  // Example of routes that don't show in menu
  {
    path: '/profile',
    displayName: 'Profile',
    icon: People,
    component: AuthPage, // Reusing component for demo
    showInMenu: false, // Hidden from menu
    requiresAuth: true,
    description: 'User profile settings',
  },
];

// ========================================
// UTILITY FUNCTIONS
// ========================================

export const getMenuItems = (userRoles?: string[]) => {
  return routeConfig
    .filter(route => {
      // Filter by showInMenu
      if (!route.showInMenu) return false;
      
      // Filter by user roles if specified
      if (route.roles && userRoles) {
        return route.roles.some(role => userRoles.includes(role));
      }
      
      return true;
    })
    .sort((a, b) => (a.order || 999) - (b.order || 999)) // Sort by order
    .map(route => ({
      text: route.displayName,
      icon: route.icon,
      path: route.path,
      badge: route.badge,
      order: route.order,
    }));
};

export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return routeConfig.find(route => route.path === path);
};

export const getPageTitle = (pathname: string): string => {
  const route = getRouteByPath(pathname);
  return route ? route.displayName : 'Page';
};

export const getPageDescription = (pathname: string): string => {
  const route = getRouteByPath(pathname);
  return route?.description || '';
};

export const isRouteAuthorized = (path: string, userRoles?: string[]): boolean => {
  const route = getRouteByPath(path);
  if (!route) return false;
  
  if (!route.requiresAuth) return true;
  if (!userRoles) return false;
  if (!route.roles) return true;
  
  return route.roles.some(role => userRoles.includes(role));
};

export const getAllRoutes = (): RouteConfig[] => {
  return routeConfig;
};

export const getPublicRoutes = (): RouteConfig[] => {
  return routeConfig.filter(route => !route.requiresAuth);
};

export const getProtectedRoutes = (): RouteConfig[] => {
  return routeConfig.filter(route => route.requiresAuth);
};