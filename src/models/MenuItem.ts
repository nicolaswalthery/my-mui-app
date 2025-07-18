export interface MenuItem {
  text: string;
  icon: React.ComponentType;
  path: string;
  badge?: string | number;
  order?: number;
}