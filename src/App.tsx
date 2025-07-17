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
import Sidebar from './components/Sidebar';

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
      
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              flexGrow: 1,
              textAlign: 'center'
            }}
          >
            Page Title
          </Typography>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              JD
            </Typography>
          </Avatar>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
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

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 2,
            px: 2,
            mt: 'auto',
            borderTop: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center">
              © 2025 Your MUI App. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}