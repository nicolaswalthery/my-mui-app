import React from 'react';
import { useHandleNavClick } from '../helpers/handleNavClick';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import { AppRouteEnum } from '../enums/AppRouteEnum';

interface MenuItem {
  text: string;
  icon: React.ComponentType;
  path: string;
}

interface Sidebar {
  menuItems: MenuItem[];
  appTitle: string;
  onItemClick?: (path: string) => void;
}

const Sidebar: React.FC<Sidebar> = ({ menuItems, appTitle, onItemClick }) => {
  // Use the passed onItemClick function which already handles mobile closing
  const handleNavClick = onItemClick || useHandleNavClick();
  return (
    <Box sx={{ bgcolor: 'background.paper', height: '100%' }}>
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
        <Typography onClick={() => handleNavClick?.(AppRouteEnum.Home)} variant="h6" component="h1" sx={{ cursor: 'pointer' }}>
          {appTitle}
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleNavClick?.(item.path)}
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