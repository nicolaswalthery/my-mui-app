export const AppRouteEnum = {
  Dashboard: '/dashboard',
  Home: '/',
  Auth: '/auth',
  Settings: '/settings',
  Profile: '/profile',
  Users: '/users',
} as const;

export type AppRouteEnum = typeof AppRouteEnum[keyof typeof AppRouteEnum];
