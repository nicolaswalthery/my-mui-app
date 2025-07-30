export const AppRouteEnum = {
  Home: '/',
  Auth: '/auth',
  Settings: '/settings',
  Profile: '/profile',
  Users: '/users',
  Error: '/error',
  EditProfile: '/edit-profile',
  MailAutoOnboarding: '/mail-auto-onboarding',

} as const;

export type AppRouteEnum = typeof AppRouteEnum[keyof typeof AppRouteEnum];
