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
import { useTheme } from '@mui/material/styles';
import { AppRouteEnum } from '../enums/AppRouteEnum';
import { useThemeMode } from '../theme/ThemeProvider';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { ThemeModeEnum } from '../enums/ThemeModeEnum';

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
  const { setThemeMode} = useThemeMode();
  const theme = useTheme();
  return (
          <Box sx={{
            bgcolor: 'background.paper',
            height: '100%', // Take full height of sidebar
            display: 'flex',
            flexDirection: 'column'
          }}>
        {/* Header */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          bgcolor: 'secondary.main',
          color: 'primary.contrastText',
          minHeight: 64,
        }}>
          <Typography
            onClick={() => handleNavClick?.(AppRouteEnum.Home)}
            variant="h6"
            component="h1"
            sx={{ cursor: 'pointer' }}
          >
            {appTitle}
          </Typography>
        </Box>

        {/* Menu Item List */}
        <List sx={{ flexGrow: 1 /*Take all the remaining space between the header and footer*/ }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => handleNavClick?.(item.path)}>
                <ListItemIcon><item.icon /></ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Footer at bottom */}
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Tooltip title={`Switch to ${theme.palette.mode === ThemeModeEnum.Light ? ThemeModeEnum.Dark : ThemeModeEnum.Light} mode`}>
            <IconButton
              onClick={() => setThemeMode(theme.palette.mode === ThemeModeEnum.Light ? ThemeModeEnum.Dark : ThemeModeEnum.Light)}
              color="inherit"
            >
              {theme.palette.mode === ThemeModeEnum.Dark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
  );
};

export default Sidebar;