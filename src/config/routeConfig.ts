import {
  Dashboard,
  Home,
  Settings,
  People,
  VpnKey
} from '@mui/icons-material';
import type { RouteConfig } from '../models/RouteConfig';
import { useLocation } from 'react-router-dom';

// Pages
import DashboardPage from '../pages/Dashboard';
import HomePage from '../pages/Home';
import SettingsPage from '../pages/Settings';
import AuthPage from '../pages/Auth';
import ProfilePage from '../pages/Profile';
import KanbanBoard from '../pages/KanbanBoard';

export const routeConfig: RouteConfig[] = [
  {
    path: '/dashboard',
    displayName: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
    showInMenu: true,
    requiresAuth: false,
    description: 'Main dashboard with overview',
    order: 2,
  },
  {
    path: '/',
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
    component: SettingsPage,
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
    component: ProfilePage,
    showInMenu: false,
    requiresAuth: true,
    description: 'User profile settings',
  },
  {
    path: '/auth',
    displayName: 'Authentication',
    icon: VpnKey,
    component: AuthPage,
    showInMenu: false,
    requiresAuth: false,
    description: 'Authentication Page',
  },
  {
    path: '/kanban-board',
    displayName: 'Kanban Board',
    icon: Dashboard,
    component: KanbanBoard,
    showInMenu: true,
    requiresAuth: false,
    description: 'Kanban Board for task management',
  },
];

// ========================================
// UTILITY FUNCTIONS
// ========================================

export const useCurrentPageTitle = () => {
  const location = useLocation();
  return getPageTitle(location.pathname);
};

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
  return route ? route.displayName : ' ! Set a Page Title ! ';
};

export const getPageDescription = (pathname: string): string => {
  const route = getRouteByPath(pathname);
  return route?.description || ' ! Set a Page Description ! ';
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