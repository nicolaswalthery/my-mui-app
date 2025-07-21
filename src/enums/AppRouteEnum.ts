export const AppRouteEnum = {
  Dashboard: '/dashboard',
  Home: '/',
  Auth: '/auth',
  Settings: '/settings',
  Profile: '/profile',
  Users: '/users',
  Error: '/error',
  KanbanBoard: '/kanban-board',
  EditProfile: '/edit-profile',

} as const;

export type AppRouteEnum = typeof AppRouteEnum[keyof typeof AppRouteEnum];
