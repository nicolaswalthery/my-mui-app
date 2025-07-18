export const AppRouteEnum = {
  Dashboard: '/',
  Home: '/home',
  Auth: '/auth',
  Settings: '/settings',
  Profile: '/profile',
  Users: '/users',
} as const;

export type AppRouteEnum = typeof AppRouteEnum[keyof typeof AppRouteEnum];