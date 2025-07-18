export interface RouteConfig {
  path: string;
  displayName: string;
  icon: React.ComponentType;
  component: React.ComponentType;
  showInMenu?: boolean;
  requiresAuth?: boolean;
  roles?: string[];
  description?: string;
  order?: number; // For menu ordering
  badge?: string | number; // For notification badges
  children?: RouteConfig[]; // For nested routes
}