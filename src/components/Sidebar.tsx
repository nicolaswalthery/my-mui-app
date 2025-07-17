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

interface MenuItem {
  text: string;
  icon: React.ComponentType;
  path: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
  appTitle: string;
  onItemClick?: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, onItemClick }) => {
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
        <Typography variant="h6" component="h1">
          appTitle
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => onItemClick?.(item.path)}
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