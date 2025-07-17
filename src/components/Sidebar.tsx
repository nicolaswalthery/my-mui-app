import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  Dashboard,
  Home,
  Settings,
  Info,
} from '@mui/icons-material';

interface MenuItem {
  text: string;
  icon: React.ComponentType;
  path: string;
}

interface SidebarProps {
  inputMenuItems?: MenuItem[];
  appTitle?: string;
  onItemClick?: (path: string) => void;
}

const defaultMenuItems: MenuItem[] = [
  { text: 'Dashboard', icon: Dashboard, path: '/' },
  { text: 'Home', icon: Home, path: '/home' },
  { text: 'Settings', icon: Settings, path: '/settings' },
  { text: 'About', icon: Info, path: '/about' },
];

const defaultAppTitle = "Material React App";

const Sidebar: React.FC<SidebarProps> = ({
  inputMenuItems,
  appTitle = defaultAppTitle,
  onItemClick
}) => {

  const menuItems = inputMenuItems ?? defaultMenuItems;

  const handleItemClick = (path: string) => {
    if (onItemClick) {
      onItemClick(path);
    }
    // You can add routing logic here if needed
    console.log(`Navigating to: ${path}`);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', height: '100%' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          bgcolor: 'secondary.main',
          color: 'primary.contrastText',
          minHeight: 64,
        }}
      >
        <Typography variant="h6" component="h1">
          {appTitle}
        </Typography>
      </Box>

      {/* Menu Items */}
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleItemClick(item.path)}
              sx={{
                color: 'text.primary',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'text.primary' }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;