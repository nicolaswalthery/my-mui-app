// src/config/routeConfig.ts - Example of how to make routes translatable
import {
  Dashboard,
  Home,
  Settings,
  People,
  VpnKey,
  Mail
} from '@mui/icons-material';
import type { RouteConfig } from '../models/RouteConfig';
import { TranslationKeyEnum } from '../enums/TranslationKeyEnum';
import { useTranslation } from '../hooks/useTranslation';
import { useLocation } from 'react-router-dom';

// Pages
import DashboardPage from '../pages/Dashboard';
import HomePage from '../pages/Home';
import SettingsPage from '../pages/Settings';
import AuthPage from '../pages/Auth';
import ProfilePage from '../pages/Profile';
import EditProfile from '../pages/EditProfile';
import MailAutomationForm from '../pages/MailAutomationForm';

// Enhanced RouteConfig with translation keys
interface TranslatableRouteConfig extends Omit<RouteConfig, 'displayName' | 'description'> {
  displayNameKey: TranslationKeyEnum;
  descriptionKey?: TranslationKeyEnum;
  displayName: string; // Fallback for non-translated usage
  description?: string; // Fallback for non-translated usage
}

export const routeConfig: TranslatableRouteConfig[] = [
  {
    path: '/dashboard',
    displayNameKey: TranslationKeyEnum.Dashboard,
    displayName: 'Dashboard', // Fallback
    icon: Dashboard,
    component: DashboardPage,
    showInMenu: true,
    requiresAuth: false,
    descriptionKey: TranslationKeyEnum.WelcomeToDashboard,
    description: 'Main dashboard with overview',
    order: 2,
  },
  {
    path: '/',
    displayNameKey: TranslationKeyEnum.Home,
    displayName: 'Home', // Fallback
    icon: Home,
    component: HomePage,
    showInMenu: true,
    requiresAuth: false,
    description: 'Welcome page with features',
    order: 1,
  },
  {
    path: '/settings',
    displayNameKey: TranslationKeyEnum.Settings,
    displayName: 'Settings', // Fallback
    icon: Settings,
    component: SettingsPage,
    showInMenu: true,
    requiresAuth: false,
    description: 'Application settings and preferences',
    order: 3,
    badge: 'New',
  },
  {
    path: '/profile',
    displayNameKey: TranslationKeyEnum.Profile,
    displayName: 'Profile', // Fallback
    icon: People,
    component: ProfilePage,
    showInMenu: false,
    requiresAuth: true,
    description: 'User profile settings',
  },
  {
    path: '/auth',
    displayNameKey: TranslationKeyEnum.Login,
    displayName: 'Authentication', // Fallback
    icon: VpnKey,
    component: AuthPage,
    showInMenu: false,
    requiresAuth: false,
    description: 'Authentication Page',
  },
  {
    path: '/edit-profile',
    displayNameKey: TranslationKeyEnum.EditProfile,
    displayName: 'Edit Profile', // Fallback
    icon: People,
    component: EditProfile,
    showInMenu: false,
    requiresAuth: true,
    description: 'Edit user profile',
  },
  {
    path: '/mail-auto-onboarding',
    displayNameKey: TranslationKeyEnum.MailAutoForm,
    displayName: 'Mail Automation', // Fallback
    icon: Mail,
    component: MailAutomationForm,
    showInMenu: true,
    requiresAuth: true,
    description: 'On-boarding form for mail automation services',
  },
];

// Hook to get translated page title
export const useCurrentPageTitle = () => {
  const { t } = useTranslation();
  const location = useLocation();
  var route = getRouteByPath(location.pathname);
  console.log(route ? t(route.displayNameKey) : 'Set a Page Title !');
  return route ? t(route.displayNameKey) : 'Set a Page Title !';
};

// Helper function that could be enhanced to use translations
export const getTranslatedMenuItems = (userRoles?: string[], t?: (key: TranslationKeyEnum) => string) => {
  return routeConfig
    .filter(route => {
      if (!route.showInMenu) return false;
      if (route.roles && userRoles) {
        return route.roles.some(role => userRoles.includes(role));
      }
      return true;
    })
    .sort((a, b) => (a.order || 999) - (b.order || 999))
    .map(route => ({
      text: t ? t(route.displayNameKey) : route.displayName, // Use translation if available
      icon: route.icon,
      path: route.path,
      badge: route.badge,
      order: route.order,
    }));
};

// Keep existing functions for backward compatibility
export const getMenuItems = (userRoles?: string[]) => {
  return routeConfig
    .filter(route => {
      if (!route.showInMenu) return false;
      if (route.roles && userRoles) {
        return route.roles.some(role => userRoles.includes(role));
      }
      return true;
    })
    .sort((a, b) => (a.order || 999) - (b.order || 999))
    .map(route => ({
      text: route.displayName, // Using fallback display name
      icon: route.icon,
      path: route.path,
      badge: route.badge,
      order: route.order,
    }));
};

export const getRouteByPath = (path: string): TranslatableRouteConfig | undefined => {
  return routeConfig.find(route => route.path === path);
};

export const getPageTitle = (pathname: string): string => {
  const route = getRouteByPath(pathname);
  return route ? route.displayName : 'Set a Page Title';
};

export const getTranslatedPageTitle = (pathname: string, t: (key: TranslationKeyEnum) => string): string => {
  const route = getRouteByPath(pathname);
  return route ? t(route.displayNameKey) : 'Set a Page Title';
};

export const getPageDescription = (pathname: string): string => {
  const route = getRouteByPath(pathname);
  return route?.description || 'Set a Page Description';
};

export const getTranslatedPageDescription = (pathname: string, t: (key: TranslationKeyEnum) => string): string => {
  const route = getRouteByPath(pathname);
  return route?.descriptionKey ? t(route.descriptionKey) : (route?.description || 'Set a Page Description');
};

export const isRouteAuthorized = (path: string, userRoles?: string[]): boolean => {
  const route = getRouteByPath(path);
  if (!route) return false;
  
  if (!route.requiresAuth) return true;
  if (!userRoles) return false;
  if (!route.roles) return true;
  
  return route.roles.some(role => userRoles.includes(role));
};

export const getAllRoutes = (): TranslatableRouteConfig[] => {
  return routeConfig;
};

export const getPublicRoutes = (): TranslatableRouteConfig[] => {
  return routeConfig.filter(route => !route.requiresAuth);
};

export const getProtectedRoutes = (): TranslatableRouteConfig[] => {
  return routeConfig.filter(route => route.requiresAuth);
};