import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Home,
  Settings,
  Info,
} from '@mui/icons-material';
import Sidebar from './components/SidebarProps';
import AppBarProps from './components/AppBarProps';
import FooterProps from './components/FooterProps';

const drawerWidth = 240;

interface MenuItem {
  text: string;
  icon: React.ComponentType;
  path: string;
}

const menuItems: MenuItem[] = [
  { text: 'Dashboard', icon: Dashboard, path: '/' },
  { text: 'Home', icon: Home, path: '/home' },
  { text: 'Settings', icon: Settings, path: '/settings' },
  { text: 'About', icon: Info, path: '/about' },
];

const defaultAppTitle = 'MUI APP';

export default function MUILayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuItemClick = (path: string) => {
    console.log('Navigating to:', path);
    // Here you can add your navigation logic
    // For example, if using React Router:
    // navigate(path);
    
    // Close mobile drawer when item is clicked
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const sideBarProps = <Sidebar 
            menuItems={menuItems} 
            appTitle={defaultAppTitle}
            onItemClick={handleMenuItemClick}
          />

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppBarProps 
        drawerWidth={drawerWidth}
        isMobile={isMobile}
        onDrawerToggle={handleDrawerToggle}
      />
        

      {/* Mobile Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {sideBarProps}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {sideBarProps}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toolbar /> {/* This creates space for the fixed AppBar */}
        
        {/* //PAGES */}

       <FooterProps footerText="FOOTER TEXT" />
      </Box>
    </Box>
  );
}